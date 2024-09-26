"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NewsElementProps {
  date: Date;
  id: number;
  isAnnouncement: boolean;
  isPublished: boolean;
  slug: string;
  title: string;
}

const AdminBox: React.FC<NewsElementProps> = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [requestDelete, setRequestDelete] = useState(false);
  return (
    <>
      <article>
        <header className="red">Admin box</header>
        {!props.isPublished && (
          <p>
            Dit artikel is nog niet gepubliceerd, het is enkel zichtbaar voor
            admins en de schrijver van het artikel.
          </p>
        )}
        {props.isAnnouncement && (
          <p>
            Dit is een aankondiging, het artikel verdwijnt van de website op{" "}
            <strong className="red">
              {props.date?.toLocaleDateString("nl-BE")}
            </strong>
          </p>
        )}
        {!props.isAnnouncement && (
          <p>
            Dit is een nieuwsartikel, het artikel is zichtbaar vanaf{" "}
            <strong className="red">
              {props.date?.toLocaleDateString("nl-BE")}
            </strong>
          </p>
        )}
        <footer className="flex-right">
          <button
            className="secondary"
            onClick={() => {
              setRequestDelete(true);
            }}
          >
            Verwijderen
          </button>
          <Link href={`/nieuws/${props.slug}/wijzigen`}>
            <button>Wijzigen</button>
          </Link>
        </footer>
      </article>
      <dialog open={requestDelete}>
        <article>
          <header>
            <h1>⚠️ Artikel verwijderen</h1>
          </header>
          <p>
            Ben je zeker dat je het artikel <strong>{props.title}</strong> wilt
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
                axios
                  .delete("/api/author/news", {
                    data: { id: props.id, authorId: session?.user.id },
                  })
                  .then(() => {
                    router.push("/nieuws");
                  });
              }}
            >
              Verwijderen
            </button>
          </footer>
        </article>
      </dialog>
    </>
  );
};

export default AdminBox;
