import HomeArticle from "./HomeArticle";
import { prisma } from "@/lib/prisma";

const HomeArticles: React.FC = async () => {
  const data = await prisma.home.findMany({
    include: {
      buttons: true,
    },
    orderBy: {
      orderId: "asc",
    },
  });

  return (
    <>
      {data.map((item) => (
        <HomeArticle
          buttons={item.buttons}
          content={item.content}
          id={item.id}
          key={item.id}
          title={item.title}
        />
      ))}
    </>
  );
};

export default HomeArticles;
