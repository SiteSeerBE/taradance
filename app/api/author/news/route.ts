import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentServerSession } from "@/lib/NextAuthFunctions";

export async function DELETE(request: Request) {
  const session = await getCurrentServerSession(["ADMIN", "WRITER"]);
  if (!session) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }

  const { id, authorId } = await request.json();

  if (session.user.roles.includes("ADMIN")) {
    const record = await prisma.news.delete({
      where: { id },
    });
    return NextResponse.json(record);
  }

  if (session.user.roles.includes("WRITER") && session.user.id === authorId) {
    const record = await prisma.news.delete({
      where: { id, authorId },
    });
    return NextResponse.json(record);
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentServerSession(["ADMIN", "WRITER"]);
  if (!session) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 }
    );
  }
  const authorId = session.user.id;

  const {
    content,
    date,
    id,
    isAnnouncement,
    isPublished,
    media,
    mediaType,
    quote,
    slug,
    title,
  } = await request.json();

  const record = await prisma.news.upsert({
    create: {
      content,
      date: new Date(date),
      isAnnouncement,
      isPublished,
      media,
      mediaType,
      quote,
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
      mediaType,
      quote,
      title,
    },
    where: { slug },
  });
  return NextResponse.json(record);
}
