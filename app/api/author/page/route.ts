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
  const record = await prisma.page.delete({
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

  const { id, title, slug, parts } = await request.json();

  try {
    // Upsert the page
    const record = await prisma.page.upsert({
      create: {
        slug,
        title,
        authorId,
      },
      update: {
        title,
        authorId,
      },
      where: { slug },
    });

    // Upsert parts if provided
    if (Array.isArray(parts)) {
      // Remove existing parts for this page (optional: for full replace)
      await prisma.part.deleteMany({ where: { pageId: record.id } });
      // Add new parts
      await prisma.part.createMany({
        data: parts.map((part) => ({
          content: part.content || "",
          mediaLocation: part.mediaLocation ?? 1,
          mediaPath: part.mediaPath ?? null,
          orderId: part.orderId ?? 0,
          pageId: record.id,
          authorId,
        })),
      });
    }

    // Return the updated page with its parts
    const updatedPage = await prisma.page.findUnique({
      where: { id: record.id },
      include: { parts: true },
    });
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { error: "Pagina bewaren gefaald" },
      { status: 500 }
    );
  }
}
