import { prisma } from "@/lib/prisma";
import { mollieClient } from "@/lib/mollie";

// Mollie POSTs application/x-www-form-urlencoded body: `id=tr_xxx`.
// We must look the payment back up via the API — the webhook body itself
// never carries the payment status, only the id to fetch it with.
export async function POST(request: Request) {
    const body = await request.text();
    const paymentId = new URLSearchParams(body).get("id");

    if (!paymentId) {
        return new Response(JSON.stringify({ error: "Missing id" }), { status: 400 });
    }

    const matchingItems = await prisma.userProduct.findMany({
        where: { molliePaymentId: paymentId },
    });

    if (matchingItems.length === 0) {
        return new Response(JSON.stringify({ error: "Unknown payment" }), { status: 404 });
    }

    const payment = await mollieClient.payments.get(paymentId);

    if (payment.status === "paid") {
        await prisma.userProduct.updateMany({
            where: { molliePaymentId: paymentId },
            data: { paid: true, paidAt: new Date() },
        });
    } else if (["canceled", "expired", "failed"].includes(payment.status)) {
        // Free the items back up so the user can retry payment.
        await prisma.userProduct.updateMany({
            where: { molliePaymentId: paymentId },
            data: { molliePaymentId: null },
        });
    }
    // Any other status (open, pending, authorized) means we just wait for the next webhook call.

    return new Response(null, { status: 200 });
}
