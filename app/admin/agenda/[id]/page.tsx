import { prisma } from "@/lib/prisma";
import EventUpdateForm from "@/components/event/EventUpdateForm";

type Params = Promise<{ id: string }>;

export default async function EventEdit({ params }: { params: Params }) {
  const { id } = await params;
  const eventId = Number.parseInt(id, 10);
  const event = Number.isNaN(eventId)
    ? null
    : await prisma.event.findUnique({ where: { id: eventId } });
  const tags = await prisma.tag.findMany();
  return <EventUpdateForm event={event} tags={tags} />;
}
