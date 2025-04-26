import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdForRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderBy = searchParams.get("orderBy") || "role";
  const direction = searchParams.get("direction") || "desc";

  const isAuthenticated = await getUserIdForRole(["ADMIN"]);
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  try {
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
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
