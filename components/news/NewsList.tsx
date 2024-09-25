import { prisma } from "@/lib/prisma";
import NewsItem from "./NewsItem";

interface Props {
  count?: number;
}

const NewsElement: React.FC<Props> = async (props) => {
  const news = await prisma.news.findMany({
    orderBy: { date: "desc" },
    select: { date: true, id: true, media: true, slug: true, title: true },
    take: props.count || 5,
    where: { isPublished: true, date: { lt: new Date() } },
  });
  return (
    <>
      {news.map((news) => {
        return (
          <div key={news.id}>
            <NewsItem
              slug={news.slug}
              title={news.title}
              date={news.date}
              media={news.media}
            />
          </div>
        );
      })}
    </>
  );
};

export default NewsElement;
