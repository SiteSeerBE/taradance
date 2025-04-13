import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logtoConfig } from "@/lib/logto";
import { getLogtoContext } from "@logto/next/server-actions";
import type { User } from "@prisma/client";

export async function GET() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  if (isAuthenticated && claims) {
    const record = await prisma.user.findUnique({
      select: {
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
      where: { logtoId: claims.sub },
    });

    return NextResponse.json(record);
  } else {
    return NextResponse.json({ error: "User not logged in" }, { status: 403 });
  }
}

export async function POST(request: Request) {
  const postData: User = await request.json();
  const { firstName, lastName, email } = postData;

  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  const logtoId = claims?.sub;

  if (!isAuthenticated) {
    return NextResponse.json({ error: "User not logged in" }, { status: 403 });
  }

  if (firstName && lastName && email) {
    let arrayNewRole = [];

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
      { status: 400 }
    );
  }
}
