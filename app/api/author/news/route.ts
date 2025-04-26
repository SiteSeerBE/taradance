import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdForRole } from "@/lib/auth";

export async function DELETE(request: Request) {
  const userId = await getUserIdForRole(["ADMIN"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  const { id } = await request.json();
  const record = await prisma.news.delete({
    where: { id },
  });
  return NextResponse.json(record);
}

export async function PUT(request: Request) {
  const authorId = await getUserIdForRole(["ADMIN", "SCHRIJVER"]);
  if (!authorId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  const { content, date, isAnnouncement, isPublished, media, slug, title } =
    await request.json();

  const record = await prisma.news.upsert({
    create: {
      content,
      date: new Date(date),
      isAnnouncement,
      isPublished,
      media,
      slug,
      title,
      authorId,
    },
    update: {
      content,
      date: new Date(date),
      isAnnouncement,
      isPublished,
      media,
      title,
      authorId,
    },
    where: { slug },
  });
  return NextResponse.json(record);
}
