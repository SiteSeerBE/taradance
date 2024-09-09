import { DocumentData } from "firebase/firestore";
import type { User } from "@/lib/dataTypes";

interface Props {
  data: DocumentData;
  roles: string[];
  user: User;
  onClick: () => void;
}

const DataCard: React.FC<Props> = ({ data, roles, user, onClick }) => {
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
        <br />
        <b>Rollen</b>: {roles.join(", ")}
      </p>
      <footer>
        <button onClick={handleClick}>Wijzigen</button>
      </footer>
    </article>
  );
};

export default DataCard;
