import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug parameter" },
      { status: 400 }
    );
  }

  const news = await prisma.news.findFirst({
    where: { slug },
    select: { slug: true },
  });

  if (!news) {
    return NextResponse.json({ error: "Slug does not exist" }, { status: 404 });
  }

  return NextResponse.json(news);
}
