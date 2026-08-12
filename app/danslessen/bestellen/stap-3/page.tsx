import Link from "next/link";
import { getLogtoId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getMollieClient } from "@/lib/mollie";

const StapDrie = async () => {
    const logtoId = await getLogtoId();
    if (!logtoId) {
        return (
            <div className="container mt1">
                <article>
                    <header>
                        <hgroup>
                            <h1>Bestellen</h1>
                            <p>Bestel in 3 stappen.</p>
                        </hgroup>
                    </header>
                    <p>U moet ingelogd zijn om deze pagina te bekijken. <Link href="/dashboard">Naar aanmeldpagina</Link>.</p>
                </article>
            </div>
        );
    }

    const user = await prisma.user.findUnique({ where: { logtoId }, select: { id: true } });
    if (!user) {
        return null;
    }

    const pendingItems = await prisma.userProduct.findMany({
        where: { payedByUserId: user.id, paid: false, molliePaymentId: { not: null } },
    });

    // The webhook is the source of truth, but it can't reach localhost and
    // may not have landed yet even in production — check directly here so
    // the confirmation page always reflects the real payment status.
    const pendingPaymentIds = new Set(pendingItems.map((item) => item.molliePaymentId!));
    const mollieClient = pendingPaymentIds.size > 0 ? getMollieClient() : null;
    for (const paymentId of pendingPaymentIds) {
        const payment = await mollieClient!.payments.get(paymentId);
        if (payment.status === "paid") {
            await prisma.userProduct.updateMany({
                where: { molliePaymentId: paymentId },
                data: { paid: true, paidAt: new Date() },
            });
        } else if (["canceled", "expired", "failed"].includes(payment.status)) {
            await prisma.userProduct.updateMany({
                where: { molliePaymentId: paymentId },
                data: { molliePaymentId: null },
            });
        }
    }

    const stillUnpaid = await prisma.userProduct.count({
        where: { payedByUserId: user.id, paid: false },
    });

    return (
        <div className="container mt1">
            <article>
                <header>
                    <hgroup>
                        <h1>Bestellen</h1>
                        <p>Stap 3 van 3.</p>
                    </hgroup>
                </header>
                {stillUnpaid === 0 ? (
                    <p>Bedankt! Je betaling is ontvangen en je bestelling is verwerkt.</p>
                ) : (
                    <>
                        <p>Je betaling is nog niet afgerond of is niet gelukt.</p>
                        <Link href="/danslessen/bestellen" role="button">Terug naar bestelling</Link>
                    </>
                )}
            </article>
        </div>
    );
};

export default StapDrie;
