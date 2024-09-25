import { prisma } from "@/lib/prisma";
import NewsUpdateForm from "@/components/news/NewsUpdateForm";
import AccessDenied from "@/components/user/AccessDenied";
import { getUserIdWithAccess } from "@/lib/NextAuthFunctions";

interface Props {
  params: {
    slug: string;
  };
}

const NewsEdit = async ({ params }: Props) => {
  const news = await prisma.news.findUnique({ where: { slug: params.slug } });
  const userIdWithAccess = await getUserIdWithAccess(["ADMIN", "WRITER"]);
  if (userIdWithAccess) {
    return <NewsUpdateForm news={news} />;
  } else {
    return <AccessDenied />;
  }
};

export default NewsEdit;
