import Link from "next/link";
import { useContext } from "react";

import Authentication from "./Authentication";
import { AuthContext } from "@/lib/authProvider";

interface AuthCheckProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children, allowedRoles }) => {
  const { roles, user } = useContext(AuthContext);

  const hasAllowedRole =
    user && allowedRoles.some((role) => roles.includes(role));

  if (hasAllowedRole) {
    return <>{children}</>;
  } else if (!user) {
    return <Authentication />;
  } else {
    return (
      <article className="container mt1 p1">
        <header>
          <h1>Geen toegang</h1>
        </header>
        Je hebt niet de juiste rechten om deze pagina te bekijken.
        <footer>
          <Link href="/">Naar de startpagina</Link> |{" "}
          <Link href="/news">Naar het nieuwsoverzicht</Link>
        </footer>
      </article>
    );
  }
};

export default AuthCheck;
