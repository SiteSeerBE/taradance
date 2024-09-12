import { queryCollectionItems } from "@/lib/CRUD/queryCollectionItems";
import HomeArticle from "./HomeArticle";
import { HomeArticleData } from "@/lib/dataTypes";
import { orderBy, QuerySnapshot } from "firebase/firestore";

const HomeArticles: React.FC = async () => {
  const snapshot: QuerySnapshot<HomeArticleData> = await queryCollectionItems(
    "/home/",
    [orderBy("order")]
  );

  return (
    <>
      {snapshot.docs.map((doc) => (
        <HomeArticle
          buttons={doc.data().buttons}
          content={doc.data().content}
          image={doc.data().image}
          id={doc.id}
          title={doc.data().title}
        />
      ))}
    </>
  );
};

export default HomeArticles;
