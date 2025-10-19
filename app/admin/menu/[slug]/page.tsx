import { prisma } from "@/lib/prisma";
import MenuUpdateForm from "@/components/menu/MenuUpdateForm";

type Params = Promise<{ slug: string }>;

export default async function MenuEdit({ params }: { params: Params }) {
  const { slug } = await params;
  const item = await prisma.menu.findUnique({
    where: { id: parseInt(slug, 10) },
  });
  return <MenuUpdateForm item={item} />;
}
