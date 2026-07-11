import { NextResponse } from "next/server";
import { getUserIdForRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type DeleteProductBody = {
  id: number;
};

type UpsertProductBody = {
  id?: number;
  name: string;
  description: string;
  price: number;
  availableFrom: string;
  availableTo: string;
  tagId?: number | null;
};

export async function DELETE(request: Request) {
  const userId = await getUserIdForRole(["ADMIN"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 },
    );
  }

  const { id }: DeleteProductBody = await request.json();
  const record = await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json(record);
}

export async function PUT(request: Request) {
  const userId = await getUserIdForRole(["ADMIN", "SCHRIJVER"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 },
    );
  }

  const { id, name, description, price, availableFrom, availableTo, tagId }: UpsertProductBody =
    await request.json();

  try {
    const data = {
      name,
      description,
      price,
      availableFrom: new Date(availableFrom),
      availableTo: new Date(availableTo),
      tagId,
    };

    const record = id
      ? await prisma.product.upsert({
          create: data,
          update: data,
          where: { id },
        })
      : await prisma.product.create({
          data,
        });

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { error: "Product bewaren gefaald" },
      { status: 500 },
    );
  }
}
