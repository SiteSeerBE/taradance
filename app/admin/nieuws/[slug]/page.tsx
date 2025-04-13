import { prisma } from "@/lib/prisma";
import NewsUpdateForm from "@/components/news/NewsUpdateForm";

interface Props {
  params: {
    slug: string;
  };
}

const NewsEdit = async ({ params }: Props) => {
  const news = await prisma.news.findUnique({ where: { slug: params.slug } });
  return <NewsUpdateForm news={news} />;
};

export default NewsEdit;
