import styles from "./HomeArticle.module.scss";
import classNames from "classnames";
import { LinkButton } from "../buttons";
import { Prisma } from "@prisma/client";

type PartialHomeWithButtons = Partial<
  Prisma.HomeGetPayload<{
    include: {
      buttons: true;
    };
  }>
>;

const HomeArticle: React.FC<PartialHomeWithButtons> = (
  props: Partial<PartialHomeWithButtons>
) => {
  return (
    <div id={"home" + props.id}>
      <div
        className={classNames(
          "row",
          "center-xs",
          "middle-xs",
          styles.fixedBg,
          styles[`bg-${props.id}`]
        )}
      />
      <div className={classNames("bg", styles.scrollingBg)}>
        <div className="container">
          <h2 className="center">{props.title}</h2>
          {props.buttons && props.buttons?.length > 0 && (
            <div className="btn-container row center-xs g1 p1">
              {props.buttons.map((button, index) => (
                <LinkButton key={index} {...button} />
              ))}
            </div>
          )}

          <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeArticle;
