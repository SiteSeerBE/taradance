import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logtoConfig } from "@/lib/logto";
import { getLogtoContext } from "@logto/next/server-actions";
import { userHasRole } from "@/lib/helpers";

type UserParameters = {
  orderBy: string;
  direction: "asc" | "desc";
  skip: number;
  take: number;
};

export async function GET(params: UserParameters) {
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
        [params.orderBy]: params.direction,
      },
      skip: params.skip,
      take: params.take,
    });
    return NextResponse.json(records);
  } else {
    return NextResponse.json({ error: "User not authorized" }, { status: 403 });
  }
}
