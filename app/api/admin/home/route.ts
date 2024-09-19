import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Button, Home } from "@prisma/client";
import { getUserIdWithAccess } from "@/lib/NextAuthFunctions";

interface requestData extends Partial<Home> {
  buttons: Partial<Button>[];
}

interface assertedButtons {
  label: string;
  href: string;
}

export async function PUT(request: Request) {
  const userIdWithAccess = await getUserIdWithAccess(["ADMIN"]);
  if (!userIdWithAccess) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }
  const data: requestData = await request.json();
  const { buttons, content, id, imagePath, orderId, title } = data;
  if (!orderId || !title || !buttons || !content || !imagePath) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  let assertedButtons: assertedButtons[] = [];
  buttons.forEach((button) => {
    if (button.label && button.href) {
      assertedButtons.push({ label: button.label, href: button.href });
    }
  });

  const record = await prisma.home.upsert({
    create: {
      buttons: {
        createMany: { data: assertedButtons },
      },
      content,
      imagePath,
      orderId,
      title,
    },
    update: {
      buttons: {
        deleteMany: {},
        createMany: { data: assertedButtons },
      },
      content,
      imagePath,
      orderId,
      title,
    },
    where: { id },
  });

  return NextResponse.json(record);
}
