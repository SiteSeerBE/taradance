import { getLogtoContext, handleSignIn } from "@logto/next/server-actions";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { logtoConfig } from "../../lib/logto";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  await handleSignIn(logtoConfig, searchParams);

  const { claims } = await getLogtoContext(logtoConfig);
  if (claims) {
    const logtoId = claims.sub;
    await prisma.user.upsert({
      where: { logtoId },
      update: {},
      create: {
        logtoId,
        role: "XXX",
      },
    });
  }

  redirect("/dashboard");
}
