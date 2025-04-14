import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logtoConfig } from "@/lib/logto";
import { getLogtoContext } from "@logto/next/server-actions";
import { userHasRole } from "@/lib/helpers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderBy = searchParams.get("orderBy") || "role";
  const direction = searchParams.get("direction") || "desc";

  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  if (isAuthenticated && claims && (await userHasRole(claims.sub, ["ADMIN"]))) {
    const records = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
      where: {
        email: { not: null },
      },
      orderBy: {
        [orderBy]: direction,
      },
    });
    return NextResponse.json(records);
  } else {
    return NextResponse.json({ error: "User not authorized" }, { status: 403 });
  }
}
