import Image from "next/image";

import styles from "./page.module.scss";
import classNames from "classnames";
import HomeArticles from "@/components/home/HomeArticles";

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
          <img
            src="https://ik.imagekit.io/taradance/UI/tr:w-300/Taradance-logo.webp"
            srcSet="https://ik.imagekit.io/taradance/UI/tr:w-500/Taradance-logo.webp 500w,https://ik.imagekit.io/taradance/UI/tr:w-300/Taradance-logo.webp 300w"
            sizes="(min-width: 1024px) 500px, 300px"
            alt="logo"
          />
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
