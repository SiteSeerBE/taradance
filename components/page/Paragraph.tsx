import ImageSet from "../ImageSet";

type imageAlign = "LEFT" | "RIGHT" | null;
type props = {
  content: string;
  imageUrl: string;
  imageAlign: imageAlign;
};

const Paragraph: React.FC<props> = (props: props) => {
  return (
    <div className="grid">
      {props.imageAlign && (
        <ImageSet image={props.imageUrl} altText={`beeld voor paragraaf`} />
      )}
      <p>{props.content}</p>
    </div>
  );
};

export default Paragraph;
