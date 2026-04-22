import { NextResponse } from "next/server";
import { getUserIdForRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type DeleteMediaBody = {
  id: number;
};

type UpsertMediaBody = {
  id?: number;
  date: string;
  path: string;
  membersPath?: string | null;
  tagId?: number | null;
  title: string;
};

export async function DELETE(request: Request) {
  const userId = await getUserIdForRole(["ADMIN", "SCHRIJVER"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 },
    );
  }

  const { id }: DeleteMediaBody = await request.json();
  const record = await prisma.media.delete({
    where: { id },
  });
  return NextResponse.json(record);
}

export async function PUT(request: Request) {
  const authorId = await getUserIdForRole(["ADMIN", "SCHRIJVER"]);
  if (!authorId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 },
    );
  }

  const { id, date, path, membersPath, tagId, title }: UpsertMediaBody =
    await request.json();

  try {
    const data = {
      date: new Date(date),
      path,
      membersPath,
      tagId,
      title,
      authorId,
    };

    const record = id
      ? await prisma.media.upsert({
          create: data,
          update: data,
          where: { id },
        })
      : await prisma.media.create({
          data,
        });

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { error: "Media bewaren gefaald" },
      { status: 500 },
    );
  }
}