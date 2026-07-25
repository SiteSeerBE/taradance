const Fotos: React.FC = async () => {
    return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>Foto&apos;s</h1>
          <hr />
        </hgroup>
      </header>
      <embed id="iframe" src="https://widgets.sociablekit.com/flickr-albums/iframe/25682959" width="100%" height="600" title="Flickr Albums" />
    </>
  );
};

export default Fotos;

// https://widgets.sociablekit.com/flickr-albums/iframe/25682959

