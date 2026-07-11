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
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      repeatId: true,
    },
  });

  const initialProductId = event
    ? products.find((product) => product.repeatId === event.repeatId)?.id ?? null
    : null;

  return (
    <EventUpdateForm
      event={event}
      tags={tags}
      products={products.map(({ id: productId, name }) => ({
        id: productId,
        name,
      }))}
      initialProductId={initialProductId}
    />
  );
}
