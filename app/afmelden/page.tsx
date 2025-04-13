import SignOut from "@/components/user/SignOut";
import { signOut } from "@logto/next/server-actions";
import { logtoConfig } from "@/lib/logto";

const Logout: React.FC = () => {
  return (
    <div className="container mt1">
      <article>
        <header>
          <h1>Afmelden</h1>
        </header>
        <p>Klik op de knop afmelden om anoniem verder te surfen.</p>
        <footer className="flex-right">
          <SignOut
            onSignOut={async () => {
              "use server";

              await signOut(logtoConfig);
            }}
          />
        </footer>
      </article>
    </div>
  );
};

export default Logout;
