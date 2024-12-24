import styles from "./HomeArticle.module.scss";
import classNames from "classnames";
import { LinkButton } from "../buttons";
import { Prisma } from "@prisma/client";

type HomeWithButtons = Prisma.HomeGetPayload<{
  include: {
    buttons: true;
  };
}>;

const HomeArticle: React.FC<Partial<HomeWithButtons>> = ({
  buttons,
  content,
  id,
  title,
}) => {
  return (
    <div id={"home" + id}>
      <div
        className={classNames(
          "row",
          "center-xs",
          "middle-xs",
          styles.fixedBg,
          styles[`bg-${id}`]
        )}
      />
      <div className={classNames("bg", styles.scrollingBg)}>
        <div className="container">
          <h2 className="center">{title}</h2>
          {buttons && buttons?.length > 0 && (
            <div className="btn-container row center-xs g1 p1">
              {buttons.map((button, index) => (
                <LinkButton key={index} {...button} />
              ))}
            </div>
          )}

          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeArticle;
