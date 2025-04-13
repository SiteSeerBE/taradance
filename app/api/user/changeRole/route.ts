import { logtoConfig } from "@/lib/logto";
import { prisma } from "@/lib/prisma";
import { getLogtoContext } from "@logto/next/server-actions";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { userHasRole } from "@/lib/helpers";

export async function POST(request: Request) {
  const postData: User = await request.json();
  const { id, role } = postData;

  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  const logtoId = claims?.sub;

  if (isAuthenticated && logtoId && (await userHasRole(logtoId, ["ADMIN"]))) {
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
