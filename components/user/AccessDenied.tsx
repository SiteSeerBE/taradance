import React from "react";
import { SignInButton } from "./AuthButtons";

const AccessDenied: React.FC = () => {
  return (
    <div className="container mt1">
      <article>
        <header>
          <h1>Geen toegang</h1>
          <p>Om toegang te krijgen tot deze pagina, moet je aanmelden.</p>
        </header>
        <h2>Bezoekers</h2>
        <p>
          Als bezoeker heb je geen meerwaarde door aan te melden op de website.
          <br />
          Deze omgeving is enkel voor dansers.
        </p>
        <h2>Dansers</h2>
        <p>
          Wanneer je je als danser aanmeldt, kan je je persoonlijke agenda en
          intern nieuws van Tarandace bekijken.
        </p>
        <footer className="flex-right">
          <SignInButton />
        </footer>
      </article>
    </div>
  );
};

export default AccessDenied;
