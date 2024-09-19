import type { User } from "@prisma/client";
import { SignOutButton } from "../buttons";

type Props = { userData: Partial<User>; updateData: () => void };

const DataCard: React.FC<Props> = ({ userData, updateData }) => {
  return (
    <div className="container mt1">
      <article className=" mt1">
        <header>
          <h1>
            {userData.firstName} {userData.lastName}
          </h1>
        </header>
        <p>
          <b>E-mail</b>: {userData.emailInput}
          <br />
          <br />
        </p>
        <footer className="flex-right">
          <button onClick={updateData}>Wijzigen</button> <SignOutButton />
        </footer>
      </article>
    </div>
  );
};

export default DataCard;
