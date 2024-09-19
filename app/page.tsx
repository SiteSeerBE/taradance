import styles from "./page.module.scss";
import classNames from "classnames";
import HomeArticles from "@/components/home/HomeArticles";
import ImageSet from "@/components/ImageSet";

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
          <h2>Nieuws</h2>
        </div>
      </div>
      <HomeArticles />
    </main>
  );
}
