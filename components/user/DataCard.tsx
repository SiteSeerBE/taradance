import { LinkButton } from "../buttons";
import type { Dispatch, SetStateAction } from "react";
import type { User } from "@prisma/client";

type Props = {
  userData: Partial<User>;
  setShowRegistration: Dispatch<SetStateAction<boolean>>;
};

const DataCard: React.FC<Props> = ({
  userData,
  setShowRegistration,
}: Props) => {
  return (
    <div className="container mt1">
      <article className=" mt1">
        <header>
          <h1>
            Welkom {userData.firstName} {userData.lastName}
          </h1>
        </header>
        <p>
          <b>Voornaam</b>: {userData.firstName}
          <br />
          <b>Achternaam</b>: {userData.lastName}
          <br />
          <b>E-mail</b>: {userData.email}
          <br />
          <br />
          <b>Rol</b>:{" "}
          {userData.role ? userData.role : "Wacht op goedkeuring teacher"}
        </p>
        <footer className="grid overflow-auto">
            {(() => {
            switch (userData.role) {
              case "ADMIN":
              return (
                <>
                  <LinkButton label="Administratie" href="/admin" full />
                  <LinkButton label="Danser" href="/danser" full />
                </>
              );
              case "DANSER":
              return <LinkButton label="Danser dashboard" href="/danser" full />;
              default:
              return <div className="hidden-xs">&nbsp;</div>;
            }
            })()}
          <div className="hidden-xs">&nbsp;</div>
          <button
            className="secondary"
            onClick={() => setShowRegistration(true)}
          >
            Wijzigen
          </button>{" "}
          <LinkButton label="Afmelden" href="/afmelden" full />
        </footer>
      </article>
    </div>
  );
};

export default DataCard;
