import { prisma } from "@/lib/prisma";
import { getMollieClient } from "@/lib/mollie";
import { RoleType } from "@prisma/client";
import { getUserIdForRole } from "@/lib/auth";

export async function POST(request: Request) {
    const payedByUserId = await getUserIdForRole([RoleType.DANSER, RoleType.ADMIN]);
    if (!payedByUserId) {
        return new Response(JSON.stringify({ error: "User not authenticated" }), { status: 401 });
    }

    const { assignments } = await request.json();
    if (!assignments || typeof assignments !== "object") {
        return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
    }

    const order = await prisma.userProduct.findMany({
        where: { payedByUserId, paid: false },
        include: { product: true },
    });

    if (order.length === 0) {
        return new Response(JSON.stringify({ error: "Niets te bestellen" }), { status: 400 });
    }

    // Every item must have an assignee
    if (order.some((item) => !assignments[item.id])) {
        return new Response(JSON.stringify({ error: "Niet alle deelnemers zijn toegewezen" }), { status: 400 });
    }

    // Assignees must be the orderer or one of their child accounts
    const allowedUsers = await prisma.user.findMany({
        where: { OR: [{ id: payedByUserId }, { parentAccountId: payedByUserId }] },
        select: { id: true },
    });
    const allowedUserIds = new Set(allowedUsers.map((u) => u.id));
    if (order.some((item) => !allowedUserIds.has(assignments[item.id]))) {
        return new Response(JSON.stringify({ error: "Ongeldige deelnemer toegewezen" }), { status: 400 });
    }

    // No product may be assigned twice to the same person
    const seen = new Set<string>();
    for (const item of order) {
        const key = `${item.productId}-${assignments[item.id]}`;
        if (seen.has(key)) {
            return new Response(JSON.stringify({ error: "Dubbele inschrijving voor een deelnemer" }), { status: 400 });
        }
        seen.add(key);
    }

    // Free products don't need Mollie at all — settle those immediately.
    const isFree = (item: (typeof order)[number]) => (item.product.price || 0) <= 0;
    const paidItems = order.filter((item) => !isFree(item));

    await prisma.$transaction(
        order.map((item) =>
            prisma.userProduct.update({
                where: { id: item.id },
                data: {
                    payedForUserId: assignments[item.id],
                    price: item.product.price,
                    ...(isFree(item) ? { paid: true, paidAt: new Date() } : {}),
                },
            })
        )
    );

    if (paidItems.length === 0) {
        // Everything in this order was free, nothing left to pay for.
        return new Response(JSON.stringify({ checkoutUrl: null }), { status: 200 });
    }

    const total = paidItems.reduce((sum, item) => sum + (item.product.price || 0), 0);

    const baseUrl = process.env.LOGTO_BASE_URL!;
    const isLocal = baseUrl.includes("localhost");

    try {
        const mollieClient = getMollieClient();
        const payment = await mollieClient.payments.create({
            amount: { currency: "EUR", value: total.toFixed(2) },
            description: `Taradance danslessen (${paidItems.length} item${paidItems.length > 1 ? "s" : ""})`,
            redirectUrl: `${baseUrl}/danslessen/bestellen/stap-3`,
            // Mollie can't reach a localhost webhookUrl, so it's only wired up once the app is deployed.
            ...(isLocal ? {} : { webhookUrl: `${baseUrl}/api/danser/checkout/webhook` }),
            metadata: { userProductIds: paidItems.map((item) => item.id) },
        });

        await prisma.userProduct.updateMany({
            where: { id: { in: paidItems.map((item) => item.id) } },
            data: { molliePaymentId: payment.id },
        });

        return new Response(JSON.stringify({ checkoutUrl: payment.getCheckoutUrl() }), { status: 201 });
    } catch (error) {
        console.error("Error creating Mollie payment:", error);
        return new Response(JSON.stringify({ error: "Betaling starten is mislukt" }), { status: 500 });
    }
}
