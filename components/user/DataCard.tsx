import { SignOutButton } from "@/components/user/AuthButtons";
import type { Account, User } from "@prisma/client";
import type { Session } from "next-auth";
import Link from "next/link";

interface UserAndAccount extends User {
  accounts: Partial<Account>[];
}

export interface Props {
  userData: Partial<UserAndAccount>;
  userSession: Session;
  updateData: () => void;
}

const DataCard: React.FC<Props> = ({ userData, userSession, updateData }) => {
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
          <b>Geregistreerd met</b>:{" "}
          <span style={{ textTransform: "capitalize" }}>
            {userData.accounts &&
              userData.accounts.map((account) => account.provider).join(", ")}
          </span>
          <br />
          <b>Toegang</b>: {userSession.user.roles.join(", ")}
        </p>
        <footer className="grid">
          {(userSession.user.roles.includes("ADMIN") ||
            userSession.user.roles.includes("WRITER")) && (
            <a href="/admin">
              <button>Administratie</button>
            </a>
          )}
          <button className="secondary" onClick={updateData}>
            Wijzigen
          </button>{" "}
          <SignOutButton />
        </footer>
      </article>
    </div>
  );
};

export default DataCard;
