import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdWithAccess } from "@/lib/NextAuthFunctions";

export async function POST(request: Request) {
  const userIdWithAccess = await getUserIdWithAccess(["ADMIN", "WRITER"]);
  if (!userIdWithAccess) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  const {
    content,
    date,
    isAnnouncement,
    isPublished,
    media,
    mediaType,
    quote,
    slug,
    title,
  } = await request.json();

  const record = await prisma.news.create({
    data: {
      content,
      date: new Date(date),
      isAnnouncement,
      isPublished,
      media,
      mediaType,
      quote,
      slug,
      title,
      authorId: userIdWithAccess,
    },
  });

  return NextResponse.json(record);
}
