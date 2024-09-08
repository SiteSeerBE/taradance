import { DocumentData } from "firebase/firestore";
import type { User } from "@/lib/dataTypes";

interface Props {
  user: User;
  data: DocumentData;
  onClick: () => void;
}

const DataCard: React.FC<Props> = ({ user, data, onClick }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <article>
      <header>
        <h1>
          {data.firstName} {data.lastName}
        </h1>
      </header>
      <p>
        <b>E-mail</b>: {data.email}
        <br />
        <b>Wachtwoord</b>: {user.providerId}
      </p>
      <footer>
        <button onClick={handleClick}>Wijzigen</button>
      </footer>
    </article>
  );
};

export default DataCard;
