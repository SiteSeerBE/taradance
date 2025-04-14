import Link from "next/link";

const Admin: React.FC = () => {
  return (
    <>
      <header className="container">
        <hgroup>
          <h1>Administratie</h1>
          <p>Beheer gebruikers, update nieuws,...</p>
        </hgroup>
      </header>
      <div className="container">
        <ul>
          <li>
            <Link href="/admin/gebruikers">Gebruikers</Link>
          </li>
          <li>
            <Link href="/admin/nieuws">Nieuws</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Admin;
