"use client";

import { useMemo, useState } from "react";
import ImageSet from "@/components/ImageSet";

type MediaItem = {
  id: number;
  title: string;
  date: Date;
  imagePath: string;
  path?: string | null;
  membersPath?: string | null;
  tag?: { id: number; name: string } | null;
};

type MediaFilterProps = {
  mediaItems: MediaItem[];
  initialTag?: number | null;
  tags: { id: number; name: string }[];
};

const isExternalUrl = (value: string) => /^https?:\/\//i.test(value);

const MediaFilter: React.FC<MediaFilterProps> = ({
  mediaItems,
  initialTag = null,
  tags,
}) => {
  const [activeTag, setActiveTag] = useState<number | null>(initialTag);

  const filteredItems = useMemo(() => {
    if (activeTag === null) {
      return mediaItems;
    }

    return mediaItems.filter((item) => item.tag?.id === activeTag);
  }, [activeTag, mediaItems]);

  return (
    <>
      {tags.length > 0 && (
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <button
              className={activeTag === null ? "primary" : "secondary"}
              onClick={() => setActiveTag(null)}
              type="button"
            >
              Alle
            </button>
            {tags.map((tag) => (
              <button
                className={activeTag === tag.id ? "primary" : "secondary"}
                key={tag.id}
                onClick={() =>
                  setActiveTag(activeTag === tag.id ? null : tag.id)
                }
                type="button"
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="container">
        <div className="row">
          {filteredItems.map((item) => {
            const mediaLink = item.path || item.membersPath || null;
            const dateLabel = item.date.toLocaleDateString("nl-BE");

            return (
              <article key={item.id} className="col-xs-12 col-md-6 col-lg-4">
                {mediaLink ? (
                  <a
                    href={mediaLink}
                    rel={isExternalUrl(mediaLink) ? "noopener noreferrer" : undefined}
                    target={isExternalUrl(mediaLink) ? "_blank" : undefined}
                  >
                    <div className="relative image100">
                      <span className="dateBox">{dateLabel}</span>
                      <ImageSet image={item.imagePath} altText={item.title} grid={3} />
                    </div>
                    <h5 className="mt1 mb0">{item.title}</h5>
                  </a>
                ) : (
                  <>
                    <div className="relative image100">
                      <span className="dateBox">{dateLabel}</span>
                      <ImageSet image={item.imagePath} altText={item.title} grid={3} />
                    </div>
                    <h5 className="mt1 mb0">{item.title}</h5>
                  </>
                )}
                {item.tag?.name && <p style={{ margin: "0.25rem 0" }}>{item.tag.name}</p>}
                {item.membersPath && (
                    <a href={item.membersPath} rel="noopener noreferrer" target="_blank">Media voor leden</a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MediaFilter;