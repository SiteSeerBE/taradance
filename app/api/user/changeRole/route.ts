import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { getUserIdForRole } from "@/lib/auth";

export async function POST(request: Request) {
  const postData: User = await request.json();
  const { id, role } = postData;

  const isAuthenticated = await getUserIdForRole(["ADMIN"]);
  if (!isAuthenticated) {
    return NextResponse.json({ error: "User not logged in" }, { status: 403 });
  }

  if (isAuthenticated) {
    if (role) {
      try {
        await prisma.user.update({
          where: { id },
          data: {
            role,
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
  } else {
    return NextResponse.json({ error: "User not authorized" }, { status: 403 });
  }
}
