const VideoPlayer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        className="video"
        autoPlay
        muted
        loop
        style={{ width: "auto", height: "100%" }}
      >
        <source src="/img/taradance.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
