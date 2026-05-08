import styles from "./DayItem.module.scss";

const DayItem = (props: {
  date: Date;
  tag?: string | null;
  tagColor?: string | null;
    timeStart?: string | null;
  title: string;
}) => {
  const dayNumber = props.date.toLocaleDateString("nl-BE", { day: "2-digit" });
  const monthText = props.date.toLocaleDateString("nl-BE", { month: "long" });
  return (
    <div className={styles.dayItem}>
      <div
        className={styles.dateSquare}
        aria-label={props.date.toLocaleDateString("nl-BE")}
        style={props.tagColor ? { backgroundColor: props.tagColor } : undefined}
      >
        <span className={styles.dayNumber}>{dayNumber}</span>
        <span className={styles.monthText}>{monthText}</span>
        {props.timeStart && <span className={styles.timeText}>{props.timeStart}</span>}
      </div>
      <div>
        <h5 className={styles.title}>{props.title}</h5>
        {props.tag && <small className={styles.tagText}>{props.tag}</small>}
      </div>
    </div>
  );
};

export default DayItem;