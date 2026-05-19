import React from 'react';
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";

const Fotos: React.FC = async () => {
    return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>Foto&apos;s en Video&apos;s</h1>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb href="/inhoud">Inhoud</Breadcrumb>
            <Breadcrumb>Foto&apos;s en Video&apos;s</Breadcrumb>
          </Breadcrumbs>
        </hgroup>
      </header>
      <embed id="iframe" src="https://widgets.sociablekit.com/flickr-albums/iframe/25682959" width="100%" height="600" title="Flickr Albums" />
    </>
  );
};

export default Fotos;

// https://widgets.sociablekit.com/flickr-albums/iframe/25682959

