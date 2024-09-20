import { NextResponse } from "next/server";
import {
  getServerSessionWithAuthOptions,
  getUserIdWithAccess,
} from "@/lib/NextAuthFunctions";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";

export async function GET() {
  const id = await getUserIdWithAccess();
  if (!id) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }
  const record = await prisma.user.findUnique({
    select: {
      email: true,
      emailInput: true,
      firstName: true,
      lastName: true,
      accounts: {
        select: {
          provider: true,
        },
      },
    },
    where: { id },
  });

  return NextResponse.json(record);
}

export async function POST(request: Request) {
  const session = await getServerSessionWithAuthOptions();
  const id = session?.user.id!;
  const postData: User = await request.json();
  const { firstName, lastName, emailInput } = postData;

  if (!id) {
    return NextResponse.json({ error: "User not logged in" }, { status: 403 });
  }

  if (firstName && lastName && emailInput) {
    let arrayNewRole = [];
    if (session?.user.roles.length === 0) {
      arrayNewRole.push({ role: "PENDING" });
    }

    const initials = `${firstName.charAt(0)}${lastName
      .split(" ")
      .pop()
      ?.charAt(0)}`;

    try {
      if (session?.user.roles.length === 0) {
        await prisma.user.update({
          where: { id },
          data: {
            emailInput,
            firstName,
            initials,
            lastName,
            roles: {
              create: [{ role: "PENDING" }],
            },
          },
        });
        return NextResponse.json({ message: "User is now pending approval" });
      } else {
        await prisma.user.update({
          where: { id },
          data: {
            emailInput,
            firstName,
            initials,
            lastName,
          },
        });
        return NextResponse.json({ message: "User updated" });
      }
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
