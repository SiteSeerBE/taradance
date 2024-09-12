import { HomeArticleProps } from "@/lib/dataTypes";
import styles from "./HomeArticle.module.scss";
import classNames from "classnames";
import { LinkButton } from "../buttons";

const HomeArticle: React.FC<HomeArticleProps> = ({
  buttons,
  content,
  id,
  image,
  title,
}) => {
  return (
    <>
      <div
        className={classNames(
          "row",
          "center-xs",
          "middle-xs",
          styles.fixedBg,
          styles[id]
        )}
      />
      <div className={classNames("backgroundColor", styles.scrollingBg)}>
        <div className="container">
          <h2 className="center">{title}</h2>
          <div className="btn-container row center-xs g1 p1">
            {buttons.map((button, index) => (
              <LinkButton key={index} {...button} />
            ))}
          </div>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default HomeArticle;
