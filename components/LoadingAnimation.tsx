import styles from "./LoadingAnimation.module.scss";
const Loading = () => {
  return (
    <div className={styles.isLoading}>
      <div>
        <div className={styles.imageContainer}>
          <img
            width="25%"
            alt="Scoil Rince Celtus logo"
            src="/src_with_words.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
