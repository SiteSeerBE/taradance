type ImageSetProps = {
  altText: string;
  grid?: number;
  image: string;
  maxViewport?: number;
};

interface imageSize {
  viewport: number;
  width: number;
}

const ImageSet: React.FC<ImageSetProps> = (props: ImageSetProps) => {
  const ImageKitEndPoinht = "https://ik.imagekit.io/taradance/";
  const imageUrl = "https://ik.imagekit.io/taradance/";
  const imagePath = props.image.replace(ImageKitEndPoinht, "");
  const baseImageSizeConfig: imageSize[] = [
    { viewport: 2000, width: Math.round(900 / (props.grid || 1)) },
    { viewport: 1600, width: Math.round(800 / (props.grid || 1)) },
    { viewport: 1200, width: Math.round(600 / (props.grid || 1)) },
    { viewport: 800, width: Math.round(400 / (props.grid || 1)) },
    { viewport: 0, width: Math.round(300 / (props.grid || 1)) },
  ];

  let imageSizeConfig: imageSize[] = baseImageSizeConfig;
  if (typeof props.maxViewport === "number") {
    const maxViewport = props.maxViewport;
    const filtered = baseImageSizeConfig.filter(
      (cfg) => cfg.viewport <= maxViewport
    );
    imageSizeConfig = filtered.length
      ? filtered
      : [baseImageSizeConfig[baseImageSizeConfig.length - 1]];
  }
  const srcSet = imageSizeConfig.map(
    (vw) => `${imageUrl}/tr:w-${vw.width}/${imagePath} ${vw.width}w`
  );
  const sizes = imageSizeConfig.map(
    (vw) => `(min-width: ${vw.viewport}px) ${vw.width}px`
  );

  return (
    <img
      alt={props.altText}
      sizes={sizes.join(", ")}
      src={srcSet.at(-1)}
      srcSet={srcSet.join(", ")}
    />
  );
};

export default ImageSet;
