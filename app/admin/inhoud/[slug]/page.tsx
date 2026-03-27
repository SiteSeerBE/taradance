import { prisma } from "@/lib/prisma";
import PageUpdateForm from "@/components/page/PageUpdateForm";

type Params = Promise<{ slug: string }>;

export default async function NewsEdit({ params }: { params: Params }) {
  const { slug } = await params;
  const content = await prisma.page.findUnique({
    where: { slug },
    include: { parts: { orderBy: { orderId: "asc" } } },
  });
  return <PageUpdateForm page={content} />;
}
