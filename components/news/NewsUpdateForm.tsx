"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import debounce from "lodash.debounce";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { AriaInvalid } from "@/lib/dataTypes";
import { getPathname, getSlug } from "@/lib/helpers";
import axios from "axios";
import { MediaType } from "@prisma/client";

type NewsUpdateFormProps = { id?: string };

const NewsUpdateForm: React.FC<NewsUpdateFormProps> = ({ id }) => {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [media, setMedia] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("IMAGE");
  const [quote, setQuote] = useState("");
  const [isAnnouncement, setAnnouncement] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");

  const [contentHasError, setContentHasError] =
    useState<AriaInvalid>(undefined);
  const [dateHasError, setDateHasError] = useState<AriaInvalid>(undefined);
  const [labelError, setLabelError] = useState<AriaInvalid>(undefined);
  const [mediaHasError, setMediaHasError] = useState<AriaInvalid>(undefined);
  const [titleHasError, setTitleHasError] = useState<AriaInvalid>(undefined);

  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    slugUpdate(title);
  }, [title]);

  const slugUpdate = useCallback(
    debounce(async (slugValue: string) => {
      setIsWaiting(true);
      if (slugValue) {
        const newSlug = await getSlug("news", slugValue);
        setSlug(newSlug);
        setIsWaiting(false);
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
    if (["quote", "link"].includes(mediaType) && !quote) {
      setLabelError(true);
      isValid = false;
    }
    if (mediaType != "QUOTE") {
      try {
        const cleanMedia = getPathname(media);
      } catch (error) {
        setMediaHasError(true);
        isValid = false;
      }
    }
    if (isValid) {
      axios
        .post("/api/author/news", {
          content,
          date,
          isAnnouncement,
          isPublished,
          mediaType,
          quote,
          slug,
          title,
        })
        .then(() => {
          setIsWaiting(false);
          router.push(`/nieuws/${slug}`);
        });
    }
  };

  return (
    <div className="container mt1">
      <article>
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
                  setTitle(e.target.value),
                  setTitleHasError(undefined),
                  setIsWaiting(false)
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
            <fieldset>
              <legend>Media type</legend>
              <input
                type="radio"
                id="image"
                name="mediaType"
                checked={mediaType === "IMAGE"}
                onChange={() => setMediaType("IMAGE")}
              />
              <label htmlFor="image">Foto</label>
              <input
                type="radio"
                id="video"
                name="mediaType"
                checked={mediaType === "VIDEO"}
                onChange={() => setMediaType("VIDEO")}
              />
              <label htmlFor="video">Youtube</label>
              <input
                type="radio"
                id="quote"
                name="mediaType"
                checked={mediaType === "QUOTE"}
                onChange={() => setMediaType("QUOTE")}
              />
              <label htmlFor="quote">Quote</label>
              <input
                type="radio"
                id="link"
                name="mediaType"
                checked={mediaType === "LINK"}
                onChange={() => setMediaType("LINK")}
              />
              <label htmlFor="link">Link</label>
            </fieldset>
            {mediaType != "QUOTE" && (
              <label>
                Media
                <small
                  className={classNames("error", "float-right", {
                    show: mediaHasError,
                  })}
                >
                  Voeg een geldige medialink toe.
                </small>
                <input
                  aria-invalid={mediaHasError}
                  autoComplete="off"
                  value={media}
                  onChange={(e) => (
                    setMedia(e.target.value),
                    setMediaHasError(undefined),
                    setIsWaiting(false)
                  )}
                  name="media"
                  placeholder="Link naar de media"
                  type="url"
                />
              </label>
            )}
            {(mediaType === "QUOTE" || mediaType === "LINK") && (
              <label>
                Quote
                <small
                  className={classNames("error", "float-right", {
                    show: labelError,
                  })}
                >
                  Vul quote in.
                </small>
                <input
                  aria-invalid={labelError}
                  autoComplete="off"
                  value={quote}
                  onChange={(e) => (
                    setQuote(e.target.value),
                    setLabelError(undefined),
                    setIsWaiting(false)
                  )}
                  name="label"
                  placeholder="Quote tekst"
                  type="text"
                />
                {mediaType === "LINK" && (
                  <small>
                    Voor link is er ook een quote nodig zodat bezoekers op deze
                    tekst kunnen klikken.
                  </small>
                )}
              </label>
            )}
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
                  setDate(e.target.value),
                  setDateHasError(undefined),
                  setIsWaiting(false)
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
                  setIsWaiting(false);
                }}
                preview="edit"
                value={content}
              />
            </label>
          </fieldset>

          <div className="grid">
            <fieldset>
              <label>
                <input
                  checked={isAnnouncement}
                  onChange={(e) => setAnnouncement(e.target.checked)}
                  role="switch"
                  type="checkbox"
                />
                Aankondiging
              </label>
              <small>Een aankondiging verdwijnt na datum.</small>
            </fieldset>
            <fieldset>
              <label>
                <input
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  role="switch"
                  type="checkbox"
                />
                Publiek zichtbaar maken
              </label>
            </fieldset>
          </div>
        </form>
        <footer className="grid">
          <Link href="/news">
            <button className="secondary">Annuleren</button>
          </Link>
          {id && <button className="secondary">Verwijderen</button>}
          <button
            aria-busy={isWaiting}
            className="primary"
            disabled={isWaiting}
            onClick={handleSubmit}
          >
            Opslaan
          </button>
        </footer>
      </article>
    </div>
  );
};

export default NewsUpdateForm;
