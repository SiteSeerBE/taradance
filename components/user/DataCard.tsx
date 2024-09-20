import { SignOutButton } from "@/components/user/AuthButtons";
import type { Account, User } from "@prisma/client";

interface UserAndAccount extends User {
  accounts: Partial<Account>[];
}

export interface Props {
  userData: Partial<UserAndAccount>;
  updateData: () => void;
}

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
          <b>Provider</b>:{" "}
          <span style={{ textTransform: "capitalize" }}>
            {userData.accounts &&
              userData.accounts.map((account) => account.provider).join(", ")}
          </span>
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
