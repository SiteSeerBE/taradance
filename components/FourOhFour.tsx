import Link from "next/link";
import styles from "./FourOhFour.module.scss";

const FourOhFour: React.FC = () => {
  return (
    <div className={styles.four}>
      <h1>404 - is cosúil go bhfuil tú caillte.</h1>
      <Link href="/">
        <button>Abhaile</button>
      </Link>
    </div>
  );
};

export default FourOhFour;
