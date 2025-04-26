import { LinkButton } from "@/components/buttons";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";

const Admin: React.FC = () => {
  return (
    <>
      <header className="container">
        <hgroup>
          <h1>Administratie</h1>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
            <Breadcrumb>Administratie</Breadcrumb>
          </Breadcrumbs>
        </hgroup>
      </header>
      <aside className="container">
        <div className="row">
          <nav className="col-xs-12 col-md-4">
            <ul>
              <li>
                <LinkButton href="/admin/gebruikers" label="Gebruikers" full />
              </li>
              <li>
                <LinkButton href="/admin/nieuws" label="Nieuws" full />
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Admin;
