import NewsList from "@/components/news/NewsList";
import styles from "./page.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const user = await prisma.user.findUnique({ where: { id: params.slug } });
//   return { title: `User profile of ${user?.name}` };
// }

export default async function News() {
  return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>Nieuws</h1>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb>Nieuws</Breadcrumb>
          </Breadcrumbs>
          <hr />
        </hgroup>
      </header>
      <div className={classNames("container", styles.news)}>
        <NewsList />
      </div>
    </>
  );
}
