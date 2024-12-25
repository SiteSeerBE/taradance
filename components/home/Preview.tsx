"use client";
import styles from "./Preview.module.scss";
import classNames from "classnames";
import Image from "next/image";

const Preview = () => {
  return (
    <section className={classNames("bg", styles.preview)}>
      <div className="container-fluid">
        <div className="grid">
          <div>
            <button
              className={styles.btnPreview}
              onClick={() => {
                const element = document.getElementById("home2");
                element?.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              }}
            >
              <Image
                src="/icons/les.svg"
                width={36}
                height={36}
                alt="Dansles"
              />
            </button>
            <h4>Dansles</h4>
            <small>
              Kom dansen bij Taradance! Lessen voor jong en oud, beginner en
              gevorderd.
            </small>
          </div>
          <div>
            <button
              className={classNames(styles.btnPreview)}
              onClick={() => {
                const element = document.getElementById("home1");
                element?.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              }}
            >
              <Image
                src="/icons/event.svg"
                width={36}
                height={36}
                alt="Evenementen"
              />
            </button>
            <h4>Events</h4>
            <small>Boek ons en maak uw event onvergetelijk!</small>
          </div>
          <div>
            <button
              className={styles.btnPreview}
              onClick={() => {
                const element = document.getElementById("home4");
                element?.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              }}
            >
              <Image
                src="/icons/cup.svg"
                width={36}
                height={36}
                alt="Competities"
              />
            </button>
            <h4>Competities</h4>
            <small>
              Wedstrijden zijn altijd een beetje reizen. Neem deel aan een
              vriendelijke competitie.
            </small>
          </div>
          <div>
            <button
              className={styles.btnPreview}
              onClick={() => {
                const element = document.getElementById("home3");
                element?.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                });
              }}
            >
              <Image
                src="/icons/stage.svg"
                width={36}
                height={36}
                alt="Shows"
              />
            </button>
            <h4>Show</h4>
            <small>
              Kom kijken naar onze spetterende shows en geniet van de Ierse
              cultuur!
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
