import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdForRole } from "@/lib/auth";

export async function DELETE(request: Request) {
  const userId = await getUserIdForRole(["ADMIN"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  const { id } = await request.json();
  const record = await prisma.menu.delete({
    where: { id },
  });
  return NextResponse.json(record);
}

export async function POST(request: Request) {
  const userId = await getUserIdForRole(["ADMIN", "SCHRIJVER"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  const { id, title, description, orderId, pageId } = await request.json();

  try {
    const record = await prisma.menu.upsert({
      create: {
        title,
        description,
        orderId,
        page: pageId || null,
      },
      update: {
        title,
        description,
        orderId,
        page: pageId || null,
      },
      where: { id: id || 0 }, // Use a non-existing id for creation
    });
    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const userId = await getUserIdForRole(["ADMIN", "SCHRIJVER"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  // fetch an array of ids to update order
  const { orderUpdates } = await request.json();
  if (!Array.isArray(orderUpdates)) {
    return NextResponse.json(
      { error: "Invalid order updates format" },
      { status: 400 }
    );
  }

  try {
    // Update each menu item's orderId
    await Promise.all(
      orderUpdates.map(({ id, orderId }: { id: number; orderId: number }) =>
        prisma.menu.update({
          where: { id },
          data: { orderId },
        })
      )
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update menu order" },
      { status: 500 }
    );
  }
}
