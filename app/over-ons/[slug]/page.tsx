import FourOhFour from "@/components/FourOhFour";
import Content from "@/components/page/Content";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ slug: string }>;

export default async function PageContent({ params }: { params: Params }) {
  const { slug } = await params;
  const content = await prisma.page.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      parts: {
        orderBy: { orderId: "asc" },
        select: {
          id: true,
          orderId: true,
          content: true,
          mediaPath: true,
          mediaLocation: true,
        },
      },
    },
  });
  if (!content) {
    return <FourOhFour />;
  }
  return <Content content={content} />;
}
