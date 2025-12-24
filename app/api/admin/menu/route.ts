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

export async function PUT(request: Request) {
  const userId = await getUserIdForRole(["ADMIN"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  const { id, title, description, contentPath, parentId } =
    await request.json();

  try {
    const record = await prisma.menu.upsert({
      create: {
        title,
        description,
        contentPath,
        parentId,
      },
      update: {
        title,
        description,
        contentPath,
        parentId,
      },
      where: { id: id || 0 }, // Use a non-existing id for creation
    });
    return NextResponse.json(record);
  } catch {
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}
