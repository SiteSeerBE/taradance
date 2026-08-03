import { prisma } from "@/lib/prisma";
import { RoleType } from "@prisma/client";
import { getUserIdForRole } from "@/lib/auth";


export async function POST(request: Request) {
    const items = await request.json();
    const payedByUserId = await getUserIdForRole([ RoleType.DANSER, RoleType.ADMIN ]);
    
    if (!Array.isArray(items) || items.length === 0) {
        return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
    }

    if (!payedByUserId) {
        return new Response(JSON.stringify({ error: "User not authenticated" }), { status: 401 });
    }

    try {
        // Create entries for each item, duplicated by amount
        const entries = items.flatMap(({ productId, quantity }: { productId: number; quantity: number }) =>
            Array.from({ length: quantity }, () => ({
                payedByUserId,
                payedForUserId: payedByUserId,
                productId,
            }))
        );

        const newUserProducts = await prisma.userProduct.createMany({
            data: entries,
        });

        return new Response(JSON.stringify(newUserProducts), { status: 201 });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return new Response(JSON.stringify({ error: "Failed to add to cart" }), { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { ids } = await request.json();
    
    if (!Array.isArray(ids) || ids.length === 0) {
        return new Response(JSON.stringify({ error: "Array of IDs is required" }), { status: 400 });
    }

    try {
        const deletedUserProducts = await prisma.userProduct.deleteMany({
            where: { id: { in: ids } },
        });

        return new Response(JSON.stringify(deletedUserProducts), { status: 200 });
    } catch (error) {
        console.error("Error removing from cart:", error);
        return new Response(JSON.stringify({ error: "Failed to remove from cart" }), { status: 500 });
    }
}