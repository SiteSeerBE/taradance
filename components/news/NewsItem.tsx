import React from "react";
import ImageSet from "../ImageSet";
import Link from "next/link";

interface NewsElementProps {
  date: Date;
  media: string | null;
  slug: string;
  title: string;
}

const NewsElement: React.FC<NewsElementProps> = (props) => {
  return (
    <Link href={`/nieuws/${props.slug}`}>
      <div className="relative">
        <span className="dateBox">
          {props.date.toLocaleDateString("nl-BE")}
        </span>
        {props.media && (
          <ImageSet image={props.media} altText={`beeld voor ${props.title}`} />
        )}
      </div>
      <h5 className="mt1">{props.title}</h5>
      <u>Meer lezen</u>
    </Link>
  );
};

export default NewsElement;
