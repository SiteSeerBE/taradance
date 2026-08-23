import styles from "./page.module.scss";
import classNames from "classnames";
import HomeArticles from "@/components/home/HomeArticles";
import NewsList from "@/components/news/NewsList";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import Preview from "@/components/home/Preview";

export default function Home() {
  return (
    <main className={styles.mainContent}>
      <div
        className={classNames(
          styles.hero,
          "row",
          "center-xs",
          "middle-xs",
          "bg-black",
          styles.fixedBg,
        )}
        style={{ position: "relative" }}
      >
        <VideoPlayer />
        <h1>
          <img
            style={{ width: "100%" }}
            src="/src_with_words.svg"
            alt="Scoil Rince Celtus Logo"
          />

          <div className="p1">
            <Link href={"/agenda/boek-ons"}>
              <button>BOEK ONS</button>
            </Link>
            &nbsp;
            <Link href={"/danslessen/inschrijven"}>
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
