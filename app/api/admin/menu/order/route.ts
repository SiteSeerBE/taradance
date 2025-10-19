import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdForRole } from "@/lib/auth";

export async function PUT(request: Request) {
  const userId = await getUserIdForRole(["ADMIN"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  const { id, order } = await request.json();
  if (order === undefined) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const record = await prisma.menu.update({
    data: { orderId: order },
    where: { id },
  });
  return NextResponse.json(record);
}
