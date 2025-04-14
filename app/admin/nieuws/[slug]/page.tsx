import { prisma } from "@/lib/prisma";
import NewsUpdateForm from "@/components/news/NewsUpdateForm";

type Params = Promise<{ slug: string }>;

export default async function NewsEdit({ params }: { params: Params }) {
  const { slug } = await params;
  const news = await prisma.news.findUnique({ where: { slug } });
  return <NewsUpdateForm news={news} />;
}
