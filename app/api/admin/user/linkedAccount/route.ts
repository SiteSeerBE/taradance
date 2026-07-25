import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { parentId, childId } = await request.json();
  console.log("Updating relationship:", { parentId, childId });
  if (!parentId || !childId) {
    return NextResponse.json(
      { message: "Parent ID and Child ID are required" },
      { status: 400 }
    );
  }

  if (parentId === childId) {
    return NextResponse.json(
      { message: "A user cannot be their own parent" },
      { status: 400 }
    );
  }

  try {
    const updatedRelation = await prisma.user.update({
      where: { id: childId },
      data: { parentAccountId: parentId }
    });

    return NextResponse.json(updatedRelation);
  } catch (error) {
    console.error("Update relationship error:", error);
    return NextResponse.json(
      { message: "Failed to update the relationship" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const {id} = await request.json();
  if (!id) {
    return NextResponse.json(
      { message: "Child ID is required" },
      { status: 400 }
    );
  }

  try {
    const updatedRelation = await prisma.user.update({
      where: { id },
      data: { parentAccountId: null }
    });

    return NextResponse.json(updatedRelation);
  } catch (error) {
    console.error("Delete relationship error:", error);
    return NextResponse.json(
      { message: "Failed to delete the relationship" },
      { status: 500 }
    );
  }
}
