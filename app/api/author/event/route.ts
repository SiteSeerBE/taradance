import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdForRole } from "@/lib/auth";

type DeleteEventBody = {
  id: number;
  repeatId?: string;
  deleteAll?: boolean;
};

type UpsertEventBody = {
  id: number;
  updateAll?: boolean;
  content: string;
  startDate: string;
  endDate: string;
  interval?: "Daily" | "Weekly" | "Monthly" | "Yearly";
  location?: string | null;
  membersContent?: string | null;
  membersOnly: boolean;
  repeatId?: string;
  time?: string | null;
  title: string;
};

const getDatesForInterval = (
  startDate: Date,
  endDate: Date,
  interval: UpsertEventBody["interval"] = "Weekly",
) => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));

    switch (interval) {
      case "Daily":
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case "Monthly":
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "Yearly":
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      case "Weekly":
      default:
        currentDate.setDate(currentDate.getDate() + 7);
        break;
    }
  }

  return dates;
};

export async function DELETE(request: Request) {
  const userId = await getUserIdForRole(["ADMIN"]);
  if (!userId) {
    return NextResponse.json(
      { error: "You are not authorized on this route" },
      { status: 403 },
    );
  }

  const { id, repeatId, deleteAll }: DeleteEventBody = await request.json();

  const record = deleteAll
    ? await prisma.event.deleteMany({
        where: { repeatId },
      })
    : await prisma.event.delete({
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

  const {
    id,
    updateAll,
    content,
    startDate,
    endDate,
    interval,
    location,
    membersContent,
    membersOnly,
    repeatId,
    time,
    title,
  }: UpsertEventBody = await request.json();

  try {
    const startDateValue = new Date(startDate);
    const data = {
      content,
      date: startDateValue,
      location,
      membersContent,
      membersOnly,
      repeatId,
      time,
      title,
      authorId,
    };

    if (updateAll && repeatId) {
      const record = await prisma.event.updateMany({
        data,
        where: { repeatId },
      });

      return NextResponse.json(record);
    }

    if (id) {
      const record = await prisma.event.upsert({
        create: data,
        update: data,
        where: { id },
      });

      return NextResponse.json(record);
    }

    const endDateValue = new Date(endDate);
    const shouldCreateSeries =
      !Number.isNaN(startDateValue.getTime()) &&
      !Number.isNaN(endDateValue.getTime()) &&
      endDateValue.getTime() > startDateValue.getTime();

    if (shouldCreateSeries) {
      const sharedRepeatId = repeatId ?? randomUUID();
      const dates = getDatesForInterval(startDateValue, endDateValue, interval);

      const [record] = await prisma.$transaction([
        prisma.event.create({
          data: {
            ...data,
            date: dates[0],
            repeatId: sharedRepeatId,
          },
        }),
        prisma.event.createMany({
          data: dates.slice(1).map((eventDate) => ({
            ...data,
            date: eventDate,
            repeatId: sharedRepeatId,
          })),
        }),
      ]);

      return NextResponse.json(record);
    }

    const record = await prisma.event.create({
      data,
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { error: "Evenement bewaren gefaald" },
      { status: 500 },
    );
  }
}
