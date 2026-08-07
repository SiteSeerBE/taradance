"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import axios from "axios";
import toast from "react-hot-toast";
import { upload } from "@imagekit/react";
import type { Media, Tag } from "@prisma/client";
import { dateFormFormat } from "@/lib/helpers";
import type { AriaInvalid } from "@/lib/dataTypes";

type MediaUpdateFormProps = {
  media?: Media | null;
  tags?: Tag[];
};

const MediaUpdateForm: React.FC<MediaUpdateFormProps> = (
  props: MediaUpdateFormProps,
) => {
  const router = useRouter();

  const [date, setDate] = useState(
    props.media?.date
      ? dateFormFormat(props.media.date)
      : new Date().toISOString().split("T")[0],
  );
  const [membersPath, setMembersPath] = useState(
    props.media?.membersPath || "",
  );
  const [path, setPath] = useState(props.media?.path || "");
  const [imagePath, setImagePath] = useState(props.media?.imagePath || "");
  const [tagId, setTagId] = useState<number | null>(props.media?.tagId || null);
  const [title, setTitle] = useState(props.media?.title || "");

  const [dateHasError, setDateHasError] = useState<AriaInvalid>(undefined);
  const [imagePathHasError, setImagePathHasError] =
    useState<AriaInvalid>(undefined);
  const [titleHasError, setTitleHasError] = useState<AriaInvalid>(undefined);

  const [isWaiting, setIsWaiting] = useState(false);
  const [requestDelete, setRequestDelete] = useState(false);
  const [progress, setProgress] = useState(0);

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsWaiting(true);
    setProgress(0);
    try {
      const { signature, expire, token, publicKey } = await authenticator();
      const response = await upload({
        file,
        fileName: file.name,
        folder: "/media",
        publicKey,
        signature,
        expire,
        token,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });
      setImagePath(response.url || "");
      setImagePathHasError(undefined);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Uploaden van het beeld is mislukt.");
    } finally {
      setIsWaiting(false);
    }
  };

  const handleSubmit = async () => {
    setIsWaiting(true);
    setDateHasError(false);
    setImagePathHasError(false);
    setTitleHasError(false);

    let isValid = true;
    if (!title.trim()) {
      setTitleHasError(true);
      isValid = false;
    }
    if (!date) {
      setDateHasError(true);
      isValid = false;
    }
    if (!imagePath) {
      setImagePathHasError(true);
      isValid = false;
    }

    if (!isValid) {
      setIsWaiting(false);
      return;
    }

    toast.promise(
      axios
        .put("/api/author/media", {
          id: props.media?.id,
          date,
          imagePath,
          membersPath,
          path,
          tagId,
          title,
        })
        .then(() => {
          router.push("/admin/media");
        }),
      {
        loading: "Opslaan...",
        success: "Media opgeslagen",
        error: "Er ging iets mis.",
      },
    );
  };

  return (
    <div className="container mt1">
      <article>
        <header>
          <h1>Media toevoegen/bewerken</h1>
          <p>Voeg verwijzingen naar media toe of update bestaande elementen.</p>
        </header>
        <form>
          <fieldset className="grid">
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
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleHasError(undefined);
                }}
                name="title"
                placeholder="Korte beschrijving"
                type="text"
              />
            </label>
            <label>
              Datum
              <small
                className={classNames("error", "float-right", {
                  show: dateHasError,
                })}
              >
                Vul een geldige datum in.
              </small>
              <input
                aria-invalid={dateHasError}
                autoComplete="off"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setDateHasError(undefined);
                }}
                name="date"
                type="date"
              />
            </label>
            <label>
              Tag
              <select
                value={tagId ?? ""}
                onChange={(e) =>
                  setTagId(e.target.value ? Number(e.target.value) : null)
                }
                name="tagId"
              >
                <option value="">Geen tag</option>
                {props.tags?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>
          <label>
            Beeld
            <small
              className={classNames("error", "float-right", {
                show: imagePathHasError,
              })}
            >
              Upload een beeld.
            </small>
            <fieldset className="grid">
              <input
                aria-invalid={imagePathHasError}
                autoComplete="off"
                disabled
                value={imagePath}
                onChange={(e) => {
                  setImagePath(e.target.value);
                  setImagePathHasError(undefined);
                }}
                name="imagePath"
                placeholder="Kies bestand"
                type="url"
              />
              <input
                accept="image/*"
                onChange={handleFileChange}
                type="file"
              />
            </fieldset>
            <progress value={progress} max="100" />
          </label>
          <label>
            Link naar highlights
            <input
              autoComplete="off"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              name="path"
              placeholder="URL naar media"
              type="url"
            />
          </label>
          <label>
            Link voor leden
            <input
              autoComplete="off"
              value={membersPath}
              onChange={(e) => setMembersPath(e.target.value)}
              name="membersPath"
              placeholder="URL naar media"
              type="url"
            />
          </label>
        </form>
        <footer className="grid">
          <Link href="/admin/media">
            <button className="secondary" type="button">
              Annuleren
            </button>
          </Link>
          <button
            className="secondary"
            type="button"
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
            type="button"
            onClick={handleSubmit}
          >
            Opslaan
          </button>
        </footer>
      </article>

      {props.media && (
        <dialog open={requestDelete}>
          <article>
            <header>
              <h1>⚠️ Media verwijderen</h1>
            </header>
            <p>
              Ben je zeker dat je het media-item <strong>{title}</strong> wilt
              verwijderen?
            </p>
            <footer className="grid">
              <button
                className="secondary"
                type="button"
                onClick={() => {
                  setRequestDelete(false);
                }}
              >
                Annuleren
              </button>
              <button
                className="primary"
                type="button"
                onClick={() => {
                  toast.promise(
                    axios
                      .delete("/api/author/media", {
                        data: { id: props.media?.id },
                      })
                      .then(() => {
                        router.push("/admin/media");
                      }),
                    {
                      loading: "Verwijderen...",
                      success: "Media verwijderd",
                      error: "Er ging iets mis.",
                    },
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

export default MediaUpdateForm;
