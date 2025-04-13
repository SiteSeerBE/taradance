import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdInRole, userHasRole } from "@/lib/helpers";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/logto";
import { RoleType } from "@prisma/client";

export async function DELETE(request: Request) {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
  const logtoId = claims?.sub;
  if (!isAuthenticated || !logtoId || !userHasRole(logtoId, ["ADMIN"])) {
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
  const userRole = "ADMIN" as RoleType;
  const authorId = await getUserIdInRole(userRole);
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
