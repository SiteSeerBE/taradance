import React from "react";
import Image from "next/image";
import styles from "./LoadingAnimation.module.scss";
import ImageSet from "./ImageSet";
const Loading = () => {
  return (
    <div className={styles.isLoading}>
      <div>
        <ImageSet image="/UI/Taradance-zwart.png" altText="Taradance logo" />
      </div>
    </div>
  );
};

export default Loading;
