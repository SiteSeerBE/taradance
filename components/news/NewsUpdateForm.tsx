"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import debounce from "lodash.debounce";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { AriaInvalid } from "@/lib/dataTypes";
import { dateFormFormat, getSlug, isImageKitUrl } from "@/lib/helpers";
import axios from "axios";
import type { News } from "@prisma/client";
import toast from "react-hot-toast";
import { IKUpload } from "imagekitio-react";

type NewsUpdateFormProps = { news?: News | null };

const NewsUpdateForm: React.FC<NewsUpdateFormProps> = ({ news }) => {
  const router = useRouter();

  // content
  const [content, setContent] = useState(news?.content || "");
  const [date, setDate] = useState(
    (news?.date && dateFormFormat(news.date)) ||
      new Date().toISOString().split("T")[0]
  );
  const [media, setMedia] = useState(news?.media || "");
  const [isAnnouncement, setAnnouncement] = useState(
    news?.isAnnouncement || false
  );
  const [isPublished, setIsPublished] = useState(news?.isPublished || false);
  const [slug, setSlug] = useState(news?.slug || "");
  const [title, setTitle] = useState(news?.title || "");

  // error handling
  const [contentHasError, setContentHasError] =
    useState<AriaInvalid>(undefined);
  const [dateHasError, setDateHasError] = useState<AriaInvalid>(undefined);
  const [mediaHasError, setMediaHasError] = useState<AriaInvalid>(undefined);
  const [titleHasError, setTitleHasError] = useState<AriaInvalid>(undefined);

  // helpers
  const [isWaiting, setIsWaiting] = useState(false);
  const [requestDelete, setRequestDelete] = useState(false);

  // ImageKit upload
  const [progress, setProgress] = useState(0);
  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  useEffect(() => {
    slugUpdate(title);
  }, [title]);

  const slugUpdate = useCallback(
    debounce(async (slugValue: string) => {
      setIsWaiting(true);
      if (slugValue && !news) {
        const newSlug = await getSlug("news", slugValue);
        setSlug(newSlug);
        setIsWaiting(false);
      } else {
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
    if (isPublished && !content) {
      setContentHasError(true);
      isValid = false;
    }
    if (!title) {
      setTitleHasError(true);
      isValid = false;
    }
    if (isPublished && !isImageKitUrl(media)) {
      setMediaHasError(true);
      isValid = false;
    }
    if (isValid) {
      toast.promise(
        axios
          .put("/api/author/news", {
            content,
            date,
            id: news?.id,
            isAnnouncement,
            isPublished,
            media,
            slug,
            title,
          })
          .then(() => {
            setIsWaiting(false);
            isPublished
              ? router.push(`/nieuws/${slug}`)
              : router.push("/admin/nieuws");
          }),
        {
          loading: "Opslaan...",
          success: "Artikel opgeslagen",
          error: "Er ging iets mis.",
        }
      );
    }
  };

  return (
    <div className="container mt1">
      <article>
        <header>
          <h1>Nieuwsbericht toevoegen/bewerken</h1>
          <p>
            Voeg een nieuwsbericht toe aan de website of maak aanpassingen aan
            een bestaand artikel.
          </p>
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
                Een slug is een unieke identificatie voor de pagina waarop dit
                nieuws verschijnt. De slug wordt automatisch uniek gemaakt door
                een volgnummer toe te voegen. Probeer te vermijden om vaak
                dezelfde titel te gebruiken.
              </small>
            </label>
            <label>
              Beeld
              <small
                className={classNames("error", "float-right", {
                  show: mediaHasError,
                })}
              >
                Laad een beeld op.
              </small>
              <fieldset className="grid">
                <input
                  aria-invalid={mediaHasError}
                  autoComplete="off"
                  disabled
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
                <IKUpload
                  urlEndpoint="https://ik.imagekit.io/taradance/nieuws"
                  publicKey="public_tdITXb95HoA/x0wYx7MSmjW6AC8="
                  folder="/nieuws"
                  authenticator={authenticator}
                  onUploadStart={() => {
                    setIsWaiting(true);
                  }}
                  onSuccess={(data) => {
                    setMedia(data.url);
                    setIsWaiting(false);
                  }}
                  onUploadProgress={(progress) => {
                    const progressPercentage = Math.round(
                      (progress.loaded / progress.total) * 100
                    );
                    setProgress(progressPercentage);
                  }}
                />
              </fieldset>
              <progress value={progress} max="100" />
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
              <small>
                Een aankondiging verdwijnt de dag na de datum die je invult.
              </small>
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
              <small>
                Laat die uit om voorlopig op te slaan zonder al te publiceren.
              </small>
            </fieldset>
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
          </div>
        </form>
        <footer className="grid">
          <Link href="/admin/nieuws">
            <button className="secondary">Annuleren</button>
          </Link>
          <button
            className="secondary"
            onClick={() => {
              setRequestDelete(true);
            }}
          >
            Verwijderen
          </button>
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
      {news && (
        <dialog open={requestDelete}>
          <article>
            <header>
              <h1>⚠️ Artikel verwijderen</h1>
            </header>
            <p>
              Ben je zeker dat je het artikel <strong>{title}</strong> wilt
              verwijderen?
            </p>
            <footer className="grid">
              <button
                className="secondary"
                onClick={() => {
                  setRequestDelete(false);
                }}
              >
                Annuleren
              </button>
              <button
                className="primary"
                onClick={() => {
                  toast.promise(
                    axios
                      .delete("/api/author/news", {
                        data: { id: news.id },
                      })
                      .then(() => {
                        router.push("/admin/nieuws");
                      }),
                    {
                      loading: "Verwijderen...",
                      success: "Artikel verwijderd",
                      error: "Er ging iets mis.",
                    }
                  );
                }}
              >
                Verwijderen
              </button>
            </footer>
          </article>
        </dialog>
      )}
    </div>
  );
};

export default NewsUpdateForm;
