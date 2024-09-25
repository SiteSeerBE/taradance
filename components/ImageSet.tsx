interface ImageSetProps {
  altText: string;
  grid?: number;
  image: string;
}

interface imageSize {
  viewport: number;
  width: number;
}

const ImageSet: React.FC<ImageSetProps> = ({ altText, image, grid = 1 }) => {
  const imageUrl = "https://ik.imagekit.io/taradance/";
  const imageSizeConfig: imageSize[] = [
    { viewport: 2000, width: Math.round(900 / grid) },
    { viewport: 1600, width: Math.round(800 / grid) },
    { viewport: 1200, width: Math.round(600 / grid) },
    { viewport: 800, width: Math.round(400 / grid) },
    { viewport: 0, width: Math.round(300 / grid) },
  ];
  const srcSet = imageSizeConfig.map(
    (vw) => `${imageUrl}/tr:w-${vw.width}/${image} ${vw.width}w`
  );
  const sizes = imageSizeConfig.map(
    (vw) => `(min-width: ${vw.viewport}px) ${vw.width}px`
  );

  return (
    <img
      alt={altText}
      sizes={sizes.join(", ")}
      src={srcSet.at(-1)}
      srcSet={srcSet.join(", ")}
    />
  );
};

export default ImageSet;
