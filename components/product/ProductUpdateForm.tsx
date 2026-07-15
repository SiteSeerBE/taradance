"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import axios from "axios";
import toast from "react-hot-toast";

import { dateFormFormat } from "@/lib/helpers";

import type { Product, Tag } from "@prisma/client";
import type { AriaInvalid } from "@/lib/dataTypes";

type ProductUpdateFormProps = {
  product?: Product | null;
  agendaItems?: Array<{ repeatId: string; label: string }>;
  tags?: Tag[];
};

const ProductUpdateForm: React.FC<ProductUpdateFormProps> = (
  props: ProductUpdateFormProps,
) => {
  const router = useRouter();

  const [name, setName] = useState(props.product?.name || "");
  const [description, setDescription] = useState(
    props.product?.description || "",
  );
  const [price, setPrice] = useState(
    props.product?.price !== undefined ? String(props.product.price) : "",
  );
  const [availableFrom, setAvailableFrom] = useState(
    props.product?.availableFrom
      ? dateFormFormat(props.product.availableFrom)
      : new Date().toISOString().split("T")[0],
  );
  const [availableTo, setAvailableTo] = useState(
    props.product?.availableTo
      ? dateFormFormat(props.product.availableTo)
      : new Date().toISOString().split("T")[0],
  );
  const [repeatId, setRepeatId] = useState<string | null>(
    props.product?.repeatId || null,
  );
  const [tagId, setTagId] = useState<number | null>(
    props.product?.tagId || null,
  );

  const [nameHasError, setNameHasError] = useState<AriaInvalid>(undefined);
  const [descriptionHasError, setDescriptionHasError] =
    useState<AriaInvalid>(undefined);
  const [priceHasError, setPriceHasError] = useState<AriaInvalid>(undefined);
  const [availableFromHasError, setAvailableFromHasError] =
    useState<AriaInvalid>(undefined);
  const [availableToHasError, setAvailableToHasError] =
    useState<AriaInvalid>(undefined);

  const [isWaiting, setIsWaiting] = useState(false);
  const [requestDelete, setRequestDelete] = useState(false);

  const handleSubmit = async () => {
    setIsWaiting(true);
    setNameHasError(false);
    setDescriptionHasError(false);
    setPriceHasError(false);
    setAvailableFromHasError(false);
    setAvailableToHasError(false);

    let isValid = true;
    const parsedPrice = Number.parseFloat(price);

    if (!name.trim()) {
      setNameHasError(true);
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionHasError(true);
      isValid = false;
    }
    if (!price || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setPriceHasError(true);
      isValid = false;
    }
    if (!availableFrom) {
      setAvailableFromHasError(true);
      isValid = false;
    }
    if (!availableTo) {
      setAvailableToHasError(true);
      isValid = false;
    }
    if (
      availableFrom &&
      availableTo &&
      new Date(availableTo) < new Date(availableFrom)
    ) {
      setAvailableToHasError(true);
      isValid = false;
    }

    if (!isValid) {
      setIsWaiting(false);
      return;
    }

    toast.promise(
      axios
        .put("/api/author/product", {
          id: props.product?.id,
          name,
          description,
          price: parsedPrice,
          availableFrom,
          availableTo,
          repeatId,
          tagId,
        })
        .then(() => {
          router.push("/admin/product");
        }),
      {
        loading: "Product opslaan...",
        success: "Product opgeslagen",
        error: "Er ging iets mis.",
      },
    );
  };

  return (
    <div className="container mt1">
      <article>
        <header>
          <h1>Product toevoegen/bewerken</h1>
          <p>
            Voeg een product toe of pas een bestaand product aan zodat je het
            aan evenementen kan koppelen.
          </p>
        </header>
        <form>
          <fieldset className="grid">
            <label>
              Naam
              <small
                className={classNames("error", "float-right", {
                  show: nameHasError,
                })}
              >
                Vul een naam in.
              </small>
              <input
                aria-invalid={nameHasError}
                autoComplete="off"
                value={name}
                onChange={(e) => (
                  setName(e.target.value),
                  setNameHasError(undefined),
                  setIsWaiting(false)
                )}
                name="name"
                placeholder="Naam van het product"
                type="text"
              />
            </label>
            <label>
              Prijs
              <small
                className={classNames("error", "float-right", {
                  show: priceHasError,
                })}
              >
                Vul een geldige prijs in.
              </small>
              <input
                aria-invalid={priceHasError}
                autoComplete="off"
                value={price}
                onChange={(e) => (
                  setPrice(e.target.value),
                  setPriceHasError(undefined),
                  setIsWaiting(false)
                )}
                min="0"
                name="price"
                placeholder="Bijv. 14.99"
                step="0.01"
                type="number"
              />
            </label>
            <label>
              Tag
              <select
                value={tagId || ""}
                onChange={(e) =>
                  setTagId(e.target.value ? Number(e.target.value) : null)
                }
                name="tagId"
              >
                <option value="">Selecteer een tag</option>
                {props.tags?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset className="grid">
            <label>
              Beschikbaar vanaf
              <small
                className={classNames("error", "float-right", {
                  show: availableFromHasError,
                })}
              >
                Vul een geldige datum in.
              </small>
              <input
                aria-invalid={availableFromHasError}
                autoComplete="off"
                value={availableFrom}
                onChange={(e) => (
                  setAvailableFrom(e.target.value),
                  setAvailableFromHasError(undefined),
                  setIsWaiting(false)
                )}
                name="availableFrom"
                type="date"
              />
            </label>
            <label>
              Beschikbaar tot
              <small
                className={classNames("error", "float-right", {
                  show: availableToHasError,
                })}
              >
                Vul een geldige einddatum in.
              </small>
              <input
                aria-invalid={availableToHasError}
                autoComplete="off"
                value={availableTo}
                onChange={(e) => (
                  setAvailableTo(e.target.value),
                  setAvailableToHasError(undefined),
                  setIsWaiting(false)
                )}
                name="availableTo"
                type="date"
              />
            </label>
            <label>
              Gekoppeld event
              <select
                value={repeatId || ""}
                onChange={(e) =>
                  setRepeatId(e.target.value ? e.target.value : null)
                }
                name="repeatId"
              >
                <option value="">Geen event</option>
                {props.agendaItems?.map((item) => (
                  <option key={item.repeatId} value={item.repeatId}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <label>
            Beschrijving
            <small
              className={classNames("error", "float-right", {
                show: descriptionHasError,
              })}
            >
              Vul een beschrijving in.
            </small>
            <textarea
              aria-invalid={descriptionHasError}
              autoComplete="off"
              value={description}
              onChange={(e) => (
                setDescription(e.target.value),
                setDescriptionHasError(undefined),
                setIsWaiting(false)
              )}
              name="description"
              placeholder="Beschrijving van het product"
              rows={6}
            />
          </label>
        </form>

        <footer className="grid">
          <Link href="/admin/product">
            <button className="secondary" type="button">
              Annuleren
            </button>
          </Link>
          <button
            className="secondary"
            disabled={!props.product}
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

      {props.product && (
        <dialog open={requestDelete}>
          <article>
            <header>
              <h1>⚠️ Product verwijderen</h1>
            </header>
            <p>
              Ben je zeker dat je het product <strong>{name}</strong> wilt
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
                      .delete("/api/author/product", {
                        data: { id: props.product?.id },
                      })
                      .then(() => {
                        router.push("/admin/product");
                      }),
                    {
                      loading: "Verwijderen...",
                      success: "Product verwijderd",
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

export default ProductUpdateForm;
