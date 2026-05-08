"use client";

import { useEffect, useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import axios from "axios";
import classNames from "classnames";
import { IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { dateFormFormat } from "@/lib/helpers";

import type { Event, Tag as TagOption } from "@prisma/client";
import type { AriaInvalid } from "@/lib/dataTypes";

type EventWithTagFields = Event & {
  media?: string | null;
  tagId?: number | null;
};

type EventUpdateFormProps = {
  event?: EventWithTagFields | null;
  tags?: TagOption[];
};

const EventUpdateForm: React.FC<EventUpdateFormProps> = (
  props: EventUpdateFormProps,
) => {
  const router = useRouter();
  const initialDate = props.event?.date ? dateFormFormat(props.event.date) : "";
  const isNew = !props.event?.id;

  // content
  const [content, setContent] = useState(props.event?.content || "");
  const [startDate, setStartDate] = useState(initialDate);
  const [important, setImportant] = useState(props.event?.important || false);
  const [location, setLocation] = useState(props.event?.location || "");
  const [membersContent, setMembersContent] = useState(
    props.event?.membersContent || "",
  );
  const [membersOnly, setMembersOnly] = useState(
    props.event?.membersOnly || false,
  );
  const [media, setMedia] = useState(props.event?.media || "");
  const [tagId, setTagId] = useState(props.event?.tagId || null);
  const [timeStart, setTimeStart] = useState(props.event?.timeStart || null);
  const [title, setTitle] = useState(props.event?.title || "");
  const [endDate, setEndDate] = useState(startDate);
  const [updateAll, setUpdateAll] = useState(false);
  const [interval, setInterval] = useState<
    "Daily" | "Weekly" | "Monthly" | "Yearly" | undefined
  >(undefined);

  // error handling
  const [dateHasError, setDateHasError] = useState<AriaInvalid>(undefined);
  const [titleHasError, setTitleHasError] = useState<AriaInvalid>(undefined);

  // helpers
  const [isWaiting, setIsWaiting] = useState(false);
  const [requestDelete, setRequestDelete] = useState(false);
  const [deleteSeries, setDeleteSeries] = useState(false);

  useEffect(() => {
    if (!props.event && !startDate) {
      const today = new Date().toISOString().split("T")[0];
      setStartDate(today);
      setEndDate(today);
    }
  }, [props.event, startDate]);

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
          `Request failed with status ${response.status}: ${errorText}`,
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

  const handleSubmit = async () => {
    setIsWaiting(true);
    setDateHasError(false);
    setTitleHasError(false);
    let isValid = true;

    if (!title.trim()) {
      setTitleHasError(true);
      isValid = false;
    }
    if (!startDate) {
      setDateHasError(true);
      isValid = false;
    }
    if (!isValid) {
      setIsWaiting(false);
      return;
    }

    const repeatId =
      props.event?.repeatId ??
      (interval ? globalThis.crypto.randomUUID() : undefined);

    await toast.promise(
      axios.put("/api/author/event", {
        id: props.event?.id,
        content,
        startDate,
        endDate,
        interval,
        important,
        location,
        membersContent,
        membersOnly,
        media,
        repeatId,
        tagId,
        timeStart,
        title,
        updateAll,
      }),
      {
        loading: "Evenement bijwerken...",
        success: "Evenement bijgewerkt!",
        error: "Er is iets misgegaan bij het bijwerken van het evenement.",
      },
    );
    router.push("/admin/agenda");
  };

  return (
    <div className="container mt1">
      <article>
        <header>
          <h1>Event toevoegen/bewerken</h1>
          <p>
            Voeg een event toe aan de agenda of maak aanpassingen aan bestaande
            events.
          </p>
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
                value={startDate}
                onChange={(e) => (
                  setStartDate(e.target.value),
                  setEndDate(e.target.value),
                  setDateHasError(undefined),
                  setIsWaiting(false)
                )}
                name="startDate"
                type="date"
              />
            </label>
            <label>
              Tijd
              <input
                autoComplete="off"
                  value={timeStart || ""}
                  onChange={(e) => setTimeStart(e.target.value)}
                  name="timeStart"
                type="time"
              />
            </label>
          </fieldset>
          <fieldset className="grid">
            <label>
              Herhalen tot
              <input
                autoComplete="off"
                disabled={!isNew}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                name="endDate"
                type="date"
              />
            </label>
            <fieldset>
              <label>
                <input
                  checked={interval === "Daily"}
                  disabled={!isNew}
                  name="repeat"
                  onChange={() => setInterval("Daily")}
                  type="radio"
                  value="Daily"
                />
                Dagelijks
              </label>
              <label>
                <input
                  checked={interval === "Weekly"}
                  disabled={!isNew}
                  name="repeat"
                  onChange={() => setInterval("Weekly")}
                  type="radio"
                  value="Weekly"
                />
                Wekelijks
              </label>
              <label>
                <input
                  checked={interval === "Monthly"}
                  disabled={!isNew}
                  name="repeat"
                  onChange={() => setInterval("Monthly")}
                  type="radio"
                  value="Monthly"
                />
                Maandelijks
              </label>
              <label>
                <input
                  checked={interval === "Yearly"}
                  disabled={!isNew}
                  name="repeat"
                  onChange={() => setInterval("Yearly")}
                  type="radio"
                  value="Yearly"
                />
                Jaarlijks
              </label>
            </fieldset>
          </fieldset>
          <label>
            Publieke tekst
            <MDEditor
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
              }}
              preview="edit"
              value={content}
            />
          </label>
          <label>
            Enkel leden tekst
            <MDEditor
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
                setMembersContent(val || "");
              }}
              preview="edit"
              value={membersContent}
            />
          </label>
          <label className="mt1">
            Locatie
            <input
              autoComplete="off"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              name="location"
              placeholder="Locatie van het event"
              type="text"
            />
            <small>
              Tip: schrijf de locatie volledig, gescheiden met comma&apos;s
            </small>
          </label>
          <label>
            Beeld
            <fieldset className="grid">
              <input
                autoComplete="off"
                disabled={true}
                value={media}
                onChange={(e) => setMedia(e.target.value)}
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
                    (progress.loaded / progress.total) * 100,
                  );
                  setProgress(progressPercentage);
                }}
              />
            </fieldset>
            <progress value={progress} max="100" />
          </label>
          <fieldset className="grid">
            <label>
              <input
                checked={membersOnly}
                onChange={(e) => setMembersOnly(e.target.checked)}
                role="switch"
                type="checkbox"
                disabled={updateAll}
              />
              Alleen voor leden
            </label>
            <label>
              <input
                checked={important}
                onChange={(e) => setImportant(e.target.checked)}
                role="switch"
                type="checkbox"
                disabled={updateAll}
              />
              Altijd bovenaan tonen
            </label>
            <label>
              <input
                checked={updateAll}
                onChange={(e) => {
                  setUpdateAll(e.target.checked);
                  setImportant(false);
                }}
                role="switch"
                type="checkbox"
                disabled={!props.event?.id}
              />
              Toepassen op gekoppelde events
            </label>
          </fieldset>
        </form>
        <footer className="grid">
          <Link href="/admin/agenda">
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
      {props.event && (
        <dialog open={requestDelete}>
          <article>
            <header>
              <h1>⚠️ Event verwijderen</h1>
            </header>
            <p>
              Ben je zeker dat je het event <strong>{title}</strong> wilt
              verwijderen?
            </p>
            <label>
              <input
                checked={deleteSeries}
                name="deleteSeries"
                onChange={(e) => setDeleteSeries(e.target.checked)}
                role="switch"
                type="checkbox"
              />
              Alle gekoppelde events ook verwijderen
            </label>
            <footer>
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
                      .delete("/api/author/event", {
                        data: deleteSeries
                          ? {
                              deleteAll: true,
                              repeatId: props.event?.repeatId,
                              id: props.event?.id,
                            }
                          : { id: props.event?.id },
                      })
                      .then(() => {
                        router.push("/admin/agenda");
                      }),
                    {
                      loading: "Verwijderen...",
                      success: "Event verwijderd",
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

export default EventUpdateForm;
