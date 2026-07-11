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

  return <ProductUpdateForm product={product} tags={tags} />;
}
