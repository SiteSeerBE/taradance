"use client";

import { useEffect } from "react";

const Fotos: React.FC = () => {
  useEffect(() => {
    // The widget script only scans the page for ".sk-ww-flickr-albums"
    // once, at the moment it executes - it never re-scans later. Next's
    // <Script> component would only load/execute it once per browser
    // session, so on client-side navigation back to this page it would
    // never re-run against the freshly mounted div. Appending our own
    // <script> element on every mount forces the browser to execute it
    // again each time this page is visited.
    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/flickr-albums/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>Foto&apos;s</h1>
          <hr />
        </hgroup>
      </header>
      <div className="container">
        <div className="sk-ww-flickr-albums" data-embed-id="25682959" />
      </div>
    </>
  );
};

export default Fotos;
