import classNames from "classnames";
import { marked } from "marked";
import { Page, Part } from "@prisma/client";

type ContentProps = {
  content: Partial<Page> & {
    parts: Partial<Part>[];
  };
};

export default function Content({ content }: ContentProps) {
  return (
    <>
      <header className="container mt1">
        <div className="row">
          <hgroup className="col-xs-12">
            <h1>{content.title}</h1>
            <hr />
          </hgroup>
        </div>
      </header>
      <div className="container">
        {content.parts.map((part) => (
          <div
            className={classNames("row", { reverse: part.mediaLocation === 2 })}
            key={part.id}
          >
            <div
              className={classNames("col-xs-12 mb1", {
                "col-md-offset-2 col-md-8": part.mediaLocation == 1,
                "col-md-6": part.mediaLocation !== 1,
                "col-md-offset-1": part.mediaLocation == 2,
              })}
              dangerouslySetInnerHTML={{ __html: marked(part.content || "") }}
            />
            <div
              key={part.id}
              className={classNames("col-xs-12 mb1", {
                "col-md-4 col-md-offset-1": part.mediaLocation == 0,
                "col-md-offset-2 col-md-8": part.mediaLocation == 1,
                "col-md-4": part.mediaLocation == 2,
              })}
            >
              {part.mediaPath && (
                <div className="relative center image100">
                  <img
                    src={part.mediaPath}
                    alt={`Media for part ${part.orderId}`}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
