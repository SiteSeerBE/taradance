import styles from "./page.module.scss";
import classNames from "classnames";
import HomeArticles from "@/components/home/HomeArticles";
import ImageSet from "@/components/ImageSet";
import NewsList from "@/components/news/NewsList";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.mainContent}>
      <div
        className={classNames("row", "center-xs", "middle-xs", styles.fixedBg)}
        style={{
          backgroundImage:
            "url(https://ik.imagekit.io/taradance/UI/home-hero.webp)",
        }}
      >
        <h1>
          <ImageSet image="/UI/Taradance-wit.png" altText="Taradance logo" />

          <div className="p1">Danslessen, competities & shows</div>
        </h1>
      </div>
      <div className={classNames("backgroundColor", styles.scrollingBg)}>
        <div className="container">
          <Link href="/nieuws">
            <h2>Nieuws</h2>
          </Link>
          <div className={classNames(styles.news)}>
            <NewsList count={3} />
          </div>
        </div>
      </div>
      <HomeArticles />
    </main>
  );
}
