interface ImageSetProps {
  image: string;
  altText: string;
}

interface imageSize {
  viewport: number;
  width: number;
}

const ImageSet: React.FC<ImageSetProps> = ({ image, altText }) => {
  const imageUrl = "https://ik.imagekit.io/taradance/";
  const imageSizeConfig: imageSize[] = [
    { viewport: 2000, width: 900 },
    { viewport: 1600, width: 800 },
    { viewport: 1200, width: 600 },
    { viewport: 800, width: 400 },
    { viewport: 0, width: 300 },
  ];
  const srcSet = imageSizeConfig.map(
    (vw) => `${imageUrl}/tr:w-${vw.width}/${image} ${vw.width}w`
  );
  const sizes = imageSizeConfig.map(
    (vw) => `(min-width: ${vw.viewport}px) ${vw.width}px`
  );

  return (
    <img
      src={srcSet.at(-1)}
      srcSet={srcSet.join(", ")}
      sizes={sizes.join(", ")}
      alt={altText}
    />
  );
};

export default ImageSet;
