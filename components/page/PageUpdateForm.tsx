"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import debounce from "lodash.debounce";
import { AriaInvalid } from "@/lib/dataTypes";
import { getSlug } from "@/lib/helpers";
import axios from "axios";
import type { Page, Part } from "@prisma/client";
import toast from "react-hot-toast";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import PartUpdateForm from "@/components/page/PartUpdateForm";

type ExtendedPage = Partial<Page> & {
  parts?: Partial<Part>[];
};

type Props = {
  page?: ExtendedPage | null;
};

const PageUpdateForm: React.FC<Props> = ({ page }) => {
  const router = useRouter();

  // error handling
  const [titleHasError, setTitleHasError] = useState<AriaInvalid>(undefined);

  // content
  const [title, setTitle] = useState(page?.title || "");
  const [slug, setSlug] = useState(page?.slug || "");
  const [parts, setParts] = useState(page?.parts || []);

  // helpers
  const [isWaiting, setIsWaiting] = useState(false);
  const [requestDelete, setRequestDelete] = useState(false);

  useEffect(() => {
    slugUpdate(title);
  }, [title]);

  const slugUpdate = useCallback(
    debounce(async (slugValue: string) => {
      setIsWaiting(true);
      if (slugValue && !page) {
        const newSlug = await getSlug("page", slugValue);
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
    setTitleHasError(false);
    let isValid = true;
    if (!title) {
      setTitleHasError(true);
      isValid = false;
    }
    if (isValid) {
      const payload = {
        id: page?.id,
        slug,
        title,
        parts: parts.map(
          ({ id, orderId, content, mediaLocation, mediaPath }) => ({
            id,
            orderId,
            content,
            mediaLocation,
            mediaPath,
          })
        ),
      };
      console.log("Submitting page payload:", payload);
      toast.promise(
        axios.put("/api/author/page", payload).then(() => {
          setIsWaiting(false);
          router.push(`/admin/inhoud/${slug}`);
        }),
        {
          loading: "Opslaan...",
          success: "Pagina en paragrafen opgeslagen",
          error: "Er ging iets mis.",
        }
      );
    }
  };

  // Handler to remove a part by orderId
  const handleRemovePart = (orderId: number) => {
    setParts((prevParts) =>
      prevParts.filter((part) => part.orderId !== orderId)
    );
  };

  return (
    <div className="container mt1">
      <article>
        <header>
          <h1>Pagina toevoegen/bewerken</h1>
          <p>
            Maak nieuwe pagina&apos;s of pas bestaande pagina&apos;s aan voor de
            website. Voor elke paragraaf kan je kiezen of je een beeld wilt
            toevoegen. Wanneer je klaar bent, kan je de pagina toevoegen aan het
            menu.
          </p>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
            <Breadcrumb href="/admin">Administratie</Breadcrumb>
            <Breadcrumb href="/admin/inhoud">Inhoud</Breadcrumb>
            <Breadcrumb>Bewerken</Breadcrumb>
          </Breadcrumbs>
        </header>
        <form onSubmit={(e) => e.preventDefault()}>
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
                placeholder="Titel van de pagina"
                type="text"
              />
            </label>
            <label>
              Slug
              <input
                disabled
                value={slug}
                name="slug"
                placeholder="Slug van de pagina"
                type="text"
              />
              <small>
                De slug is een deel van de URL van deze pagina. De slug wordt
                afgeleid van de titel en wordt automatisch uniek gemaakt door
                een volgnummer toe te voegen. Probeer te vermijden om vaak
                dezelfde titel te gebruiken zodat url&apos;s uniek blijven.
              </small>
            </label>
          </fieldset>
          {parts.map((part) => (
            <PartUpdateForm
              key={part.orderId}
              id={part.id}
              orderId={part.orderId || 0}
              content={part.content || ""}
              mediaLocation={part.mediaLocation || 0}
              mediaPath={part.mediaPath || ""}
              setIsWaiting={setIsWaiting}
              setParts={setParts}
              onRemove={handleRemovePart}
            />
          ))}
          <button
            type="button"
            onClick={() => {
              const maxOrderId = parts.reduce(
                (max, part) =>
                  part.orderId && part.orderId > max ? part.orderId : max,
                0
              );
              setParts([...parts, { orderId: maxOrderId + 1 }]);
            }}
          >
            Paragraaf toevoegen
          </button>
        </form>
        <footer className="grid">
          <Link href="/admin/inhoud">
            <button className="secondary">Terug</button>
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
      {page && (
        <dialog open={requestDelete}>
          <article>
            <header>
              <h1>⚠️ Artikel verwijderen</h1>
            </header>
            <p>
              Ben je zeker dat je de pagina <strong>{title}</strong> wilt
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
                      .delete("/api/author/page", {
                        data: { id: page.id },
                      })
                      .then(() => {
                        router.push("/admin/inhoud");
                      }),
                    {
                      loading: "Verwijderen...",
                      success: "Pagina verwijderd",
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

export default PageUpdateForm;
