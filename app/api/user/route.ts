import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import { getLogtoId } from "@/lib/auth";

export async function GET() {
  const logtoId = await getLogtoId();
  if (!logtoId) {
    return NextResponse.json({ error: "User not logged in" }, { status: 403 });
  }

  try {
    const record = await prisma.user.upsert({
      where: { logtoId },
      update: {},
      create: {
        logtoId,
        role: "XXX",
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const postData: User = await request.json();
  const { firstName, lastName, email } = postData;

  const logtoId = await getLogtoId();
  if (!logtoId) {
    return NextResponse.json({ error: "User not logged in" }, { status: 403 });
  }

  if (firstName && lastName && email) {
    try {
      await prisma.user.update({
        where: { logtoId },
        data: {
          email,
          firstName,
          lastName,
        },
      });
      return NextResponse.json({ message: "User updated" });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
}
