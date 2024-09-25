import NewsList from "@/components/news/NewsList";
import styles from "./page.module.scss";
import classNames from "classnames";

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const user = await prisma.user.findUnique({ where: { id: params.slug } });
//   return { title: `User profile of ${user?.name}` };
// }

export default async function News() {
  return (
    <>
      <div className="breadcrumb center container-flex">
        <h1>NIEUWS</h1>
      </div>
      <div className={classNames("container mt7", styles.news)}>
        <NewsList />
      </div>
    </>
  );
}
