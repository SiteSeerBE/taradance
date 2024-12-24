import styles from "./page.module.scss";
import classNames from "classnames";
import HomeArticles from "@/components/home/HomeArticles";
import ImageSet from "@/components/ImageSet";
import NewsList from "@/components/news/NewsList";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import Image from "next/image";
import Preview from "@/components/home/Preview";

export default function Home() {
  return (
    <main className={styles.mainContent}>
      <div
        className={classNames(
          "row",
          "center-xs",
          "middle-xs",
          "bg-black",
          styles.fixedBg
        )}
      >
        <VideoPlayer />
        <h1>
          <ImageSet image="/UI/Taradance-wit.png" altText="Taradance logo" />

          <div className="p1">
            <Link href={"/login"}>
              <button>BOEK ONS</button>
            </Link>
            &nbsp;
            <Link href={"/login"}>
              <button className="outline">SCHRIJF JE IN</button>
            </Link>
          </div>
        </h1>
      </div>
      <div className={classNames("bg", styles.scrollingBg)}>
        <Preview />
        <div className="container">
          <Link href="/nieuws">
            <h4>
              Nieuws <span className="link-indicator">&gt;</span>
            </h4>
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
