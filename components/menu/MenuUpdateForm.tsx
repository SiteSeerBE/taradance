"use client";

import type { Menu } from "@prisma/client";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AriaInvalid } from "@/lib/dataTypes";

type MenuUpdateFormProps = { item?: Menu | null };

const MenuUpdateForm: React.FC<MenuUpdateFormProps> = ({ item }) => {
  const router = useRouter();

  //content
  const [contentPath, setContentPath] = useState(item?.contentPath || "");
  const [description, setDescription] = useState(item?.description || "");
  const [title, setTitle] = useState(item?.title || "");

  // error handeling
  const [contentHasError, setContentHasError] =
    useState<AriaInvalid>(undefined);
  const [contentPathHasError, setContentPathHasError] =
    useState<AriaInvalid>(undefined);
  const [descriptionHasError, setDescriptionHasError] =
    useState<AriaInvalid>(undefined);
  const [titleHasError, setTitleHasError] = useState<AriaInvalid>(undefined);

  //helpers
  const [isWaiting, setIsWaiting] = useState(false);
  const [requestDelete, setRequestDelete] = useState(false);

  const handleSubmit = async () => {
    setIsWaiting(true);
    setContentHasError(false);
    setDescriptionHasError(false);
    setTitleHasError(false);
    let isValid = true;

    if (title.trim().length === 0) {
      setTitleHasError(true);
      isValid = false;
    }
    if (description.trim().length === 0) {
      setDescriptionHasError(true);
      isValid = false;
    }
    if (contentPath.trim().length === 0) {
      setContentPathHasError(true);
      isValid = false;
    }

    if (isValid) {
      const normalizedPath = (() => {
        const p = contentPath.trim();
        try {
          // root-relative paths work with a base origin, absolute URLs parse directly
          const url = p.startsWith("/")
            ? new URL(p, window.location.origin)
            : new URL(p);
          return url.pathname;
        } catch {
          // fallback: ensure it starts with a slash
          return p.startsWith("/") ? p : `/${p}`;
        }
      })();

      toast.promise(
        axios
          .put("/api/admin/menu", {
            id: item?.id,
            title,
            description,
            contentPath: normalizedPath,
          })
          .then(() => {
            router.push("/admin/menu");
          }),
        {
          loading: "Opslaan...",
          success: "Menu item opgeslagen",
          error: "Er ging iets mis.",
        }
      );
    }
  };

  return (
    <div className="container mt-1">
      <article>
        <header>
          <h1>Menu toevoegen/bewerken</h1>
          <p>
            Voeg een element toe aan het menu of wijzig de achterliggende
            pagina.
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
                placeholder="Titel van het menu item"
                type="text"
              />
            </label>
            <label>
              Beschrijving
              <small
                className={classNames("error", "float-right", {
                  show: descriptionHasError,
                })}
              >
                Vul een beschrijving in.
              </small>
              <input
                autoComplete="off"
                value={description}
                onChange={(e) => (
                  setDescription(e.target.value),
                  setDescriptionHasError(undefined),
                  setIsWaiting(false)
                )}
                name="description"
                placeholder="Korte beschrijving van het menu item"
                type="text"
              />
            </label>
            <label>
              URL voor menu item
              <small
                className={classNames("error", "float-right", {
                  show: contentPathHasError,
                })}
              >
                Vul een URL in.
              </small>
              <input
                autoComplete="off"
                value={contentPath}
                onChange={(e) => (
                  setContentPath(e.target.value), setIsWaiting(false)
                )}
                name="contentPath"
                placeholder="Adres waar deze link heen gaat (bijv. /about)"
                type="text"
              />
            </label>
          </fieldset>
        </form>
        <footer className="grid">
          <Link href="/admin/menu">
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
      {item && (
        <dialog open={requestDelete}>
          <article>
            <header>
              <h1>⚠️ Menu item verwijderen</h1>
            </header>
            <p>
              Ben je zeker dat je het menu item <strong>{title}</strong> wilt
              verwijderen? Eventuele onderliggende pagina's worden niet
              verwijderd.
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
                      .delete("/api/admin/menu", {
                        data: { id: item.id },
                      })
                      .then(() => {
                        router.push("/admin/menu");
                      }),
                    {
                      loading: "Verwijderen...",
                      success: "Menu item verwijderd",
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
export default MenuUpdateForm;
