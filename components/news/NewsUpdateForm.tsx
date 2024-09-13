"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { Timestamp } from "firebase/firestore";
import debounce from "lodash.debounce";
import MDEditor, { commands } from "@uiw/react-md-editor";

import { AriaInvalid } from "@/lib/dataTypes";
import { AuthContext } from "@/lib/authProvider";
import { addCollectionItem } from "@/lib/CRUD/addCollectionItem";
import { getSlug } from "@/lib/helpers";

type NewsUpdateFormProps = { id?: string };

const NewsUpdateForm: React.FC<NewsUpdateFormProps> = ({ id }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isNext, setIsNext] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");

  const [contentHasError, setContentHasError] =
    useState<AriaInvalid>(undefined);
  const [dateHasError, setDateHasError] = useState<AriaInvalid>(undefined);
  const [titleHasError, setTitleHasError] = useState<AriaInvalid>(undefined);

  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    slugUpdate(title);
  }, [title]);

  const slugUpdate = useCallback(
    debounce(async (slugValue: string) => {
      if (slugValue) {
        const newSlug = await getSlug("news", slugValue);
        setSlug(newSlug);
      }
    }, 500),
    []
  );

  const handleSubmit = async () => {
    setIsWaiting(true);
    setContentHasError(false);
    setDateHasError(false);
    setTitleHasError(false);
    let isValid = true;
    if (!date) {
      setDateHasError(true);
      isValid = false;
    }
    if (!content) {
      setContentHasError(true);
      isValid = false;
    }
    if (!title) {
      setTitleHasError(true);
      isValid = false;
    }
    if (isValid && user) {
      const firestoreTimestamp = Timestamp.fromDate(new Date(date));
      await addCollectionItem(
        "news",
        {
          authorId: user.uid,
          content,
          date: firestoreTimestamp,
          isPublished,
          isNext,
          title,
        },
        slug
      );
      router.push("/nieuws/${slug}");
    }
  };

  return (
    <div>
      <article className="container mt1 p1">
        <header>
          <h1>Nieuwsbericht toevoegen</h1>
          <p>Voeg een nieuwsbericht toe aan de website.</p>
        </header>
        <form>
          <fieldset>
            <label>
              Titel
              <small
                className={classNames("error", "float-right", {
                  show: titleHasError,
                })}
              >
                Vul een titel in.
              </small>
              <input
                aria-invalid={titleHasError}
                autoComplete="off"
                value={title}
                onChange={(e) => (
                  setTitle(e.target.value), setTitleHasError(undefined)
                )}
                name="title"
                placeholder="Titel van de post"
                type="text"
              />
            </label>
            <label>
              Slug
              <input
                disabled
                value={slug}
                name="slug"
                placeholder="Slug van de post"
                type="text"
              />
              <small>
                Een slug is een unieke identificatie voor de pagina waarop deze
                tekst verschijnt. De slug wordt automatisch uniek gemaakt door
                een volgnummer toe te voegen. Probeer te vermijden om vaak
                dezelfde titel te gebruiken.
              </small>
            </label>
            <label>
              Datum
              <small
                className={classNames("error", "float-right", {
                  show: dateHasError,
                })}
              >
                Vul een gelidge datum in.
              </small>
              <input
                aria-invalid={dateHasError}
                autoComplete="off"
                value={date}
                onChange={(e) => (
                  setDate(e.target.value), setDateHasError(undefined)
                )}
                name="date"
                type="date"
              />
            </label>
            <label>
              Tekst
              <small
                className={classNames("error", "float-right", {
                  show: contentHasError,
                })}
              >
                Vul een tekst in.
              </small>
              <MDEditor
                aria-invalid={contentHasError}
                commands={[
                  commands.title,
                  commands.bold,
                  commands.italic,
                  commands.hr,
                  commands.quote,
                  commands.divider,
                  commands.orderedListCommand,
                  commands.unorderedListCommand,
                  commands.link,
                  commands.table,
                  commands.divider,
                  commands.help,
                ]}
                onChange={(val) => {
                  setContent(val || "");
                  setContentHasError(undefined);
                }}
                preview="edit"
                value={content}
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              <input
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                role="switch"
                type="checkbox"
              />
              Voor iedereen zichtbaar
            </label>
            <label>
              <input
                checked={isNext}
                onChange={(e) => setIsNext(e.target.checked)}
                role="switch"
                type="checkbox"
              />
              Gebruiken voor COMING UP
            </label>
          </fieldset>
        </form>
        <footer className="grid">
          <Link href="/news">
            <button className="secondary">Annuleren</button>
          </Link>
          {id && <button className="secondary">Verwijderen</button>}
          <button className="primary" onClick={handleSubmit}>
            Opslaan
          </button>
        </footer>
      </article>
    </div>
  );
};

export default NewsUpdateForm;
