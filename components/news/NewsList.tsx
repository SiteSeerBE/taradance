import { prisma } from "@/lib/prisma";
import NewsItem from "./NewsItem";

interface Props {
  count?: number;
}

const NewsElement: React.FC<Props> = async (props) => {
  const announcement = await prisma.news.findFirst({
    orderBy: { date: "asc" },
    select: {
      date: true,
      id: true,
      isAnnouncement: true,
      isPublished: true,
      media: true,
      slug: true,
      title: true,
    },
    where: {
      date: { gt: new Date() },
      isAnnouncement: true,
      isPublished: true,
    },
  });
  const take = (props.count || 30) - (announcement ? 1 : 0);
  const news = await prisma.news.findMany({
    orderBy: { date: "desc" },
    select: {
      date: true,
      id: true,
      isAnnouncement: true,
      isPublished: true,
      media: true,
      slug: true,
      title: true,
    },
    take,
    where: {
      date: { lte: new Date() },
      isAnnouncement: false,
      isPublished: true,
    },
  });
  if (announcement) {
    news.unshift(announcement);
  }
  return (
    <>
      {news.map((item) => {
        return (
          <div key={item.id}>
            <NewsItem
              date={item.date}
              isAnnouncement={item.isAnnouncement}
              media={item.media}
              slug={item.slug}
              title={item.title}
            />
          </div>
        );
      })}
    </>
  );
};

export default NewsElement;
