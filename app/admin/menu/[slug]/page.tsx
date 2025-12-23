import { prisma } from "@/lib/prisma";
import MenuUpdateForm from "@/components/menu/MenuUpdateForm";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function MenuEdit({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const { title: urlTitle, slug: urlSlug } = await searchParams;
  const item = await prisma.menu.findUnique({
    where: { id: parseInt(slug, 10) },
  });
  return (
    <MenuUpdateForm
      item={item}
      urlSlug={urlSlug as string | undefined}
      urlTitle={urlTitle as string | undefined}
    />
  );
}
