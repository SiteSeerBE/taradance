import React from "react";
import styles from "./LoadingAnimation.module.scss";
import ImageSet from "./ImageSet";
const Loading = () => {
  return (
    <div className={styles.isLoading}>
      <div>
        <div className={styles.imageContainer}>
          <ImageSet altText="Taradance logo" image="/UI/Taradance-zwart.png" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
