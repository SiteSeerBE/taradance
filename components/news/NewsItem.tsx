import React from "react";
import ImageSet from "../ImageSet";
import Link from "next/link";

interface NewsElementProps {
  date: Date;
  isAnnouncement: boolean;
  media: string | null;
  slug: string;
  title: string;
}

const NewsElement: React.FC<NewsElementProps> = (props) => {
  return (
    <Link href={`/nieuws/${props.slug}`}>
      <div className="relative">
        <span className="dateBox">
          {!props.isAnnouncement
            ? props.date.toLocaleDateString("nl-BE")
            : "AANKONDIGING"}
        </span>
        {props.media && (
          <ImageSet image={props.media} altText={`beeld voor ${props.title}`} />
        )}
      </div>
      <h5 className="mt1">{props.title}</h5>
    </Link>
  );
};

export default NewsElement;
