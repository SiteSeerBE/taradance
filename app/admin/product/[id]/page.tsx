import { prisma } from "@/lib/prisma";
import ProductUpdateForm from "@/components/product/ProductUpdateForm";

type Params = Promise<{ id: string }>;

export default async function ProductEdit({ params }: { params: Params }) {
  const { id } = await params;
  const productId = Number.parseInt(id, 10);
  const product = Number.isNaN(productId)
    ? null
    : await prisma.product.findUnique({ where: { id: productId } });
  const tags = await prisma.tag.findMany();
  const events = await prisma.event.findMany({
    distinct: ["repeatId"],
    orderBy: { date: "asc" },
    select: {
      repeatId: true,
      title: true,
      date: true,
    },
  });

  const agendaItems = events.map((event) => ({
    repeatId: event.repeatId,
    label: `${event.title} (${event.date.toLocaleDateString("nl-BE")})`,
  }));

  return (
    <ProductUpdateForm
      product={product}
      tags={tags}
      agendaItems={agendaItems}
    />
  );
}
