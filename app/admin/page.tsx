import Link from "next/link";

const Admin: React.FC = () => {
  return (
    <>
      <div className="breadcrumb center container-flex">
        <h1>Administratie</h1>
      </div>
      <div className="container mt7">
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
