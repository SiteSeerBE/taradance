import styles from "./VideoPlayer.module.scss";
const VideoPlayer = () => {
  return (
    <div>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        style={{ width: "auto", height: "100%" }}
      >
        <source
          src="https://ik.imagekit.io/taradance/home/taradance.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
