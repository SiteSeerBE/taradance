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
          <nav className="col-xs-12 col-md-12">
            <ul className="row">
              <li className="col-xs-12 col-md-4">
                <LinkButton href="/admin/agenda" label="Agenda" full />
                <LinkButton
                  href="/admin/agenda/0"
                  label="Evenement toevoegen"
                  full
                />
              </li>
              <li className="col-xs-12 col-md-4">
                <LinkButton href="/admin/nieuws" label="Nieuws" full />
                <LinkButton
                  href="/admin/nieuws/toevoegen"
                  label="Nieuws toevoegen"
                  full
                />
              </li>
              <li className="col-xs-12 col-md-4">
                <LinkButton href="/admin/inhoud" label="Inhoud" full />
                <LinkButton
                  href="/admin/inhoud/toevoegen"
                  label="Inhoud toevoegen"
                  full
                />
              </li>
              <li className="col-xs-12 col-md-4">
                <LinkButton href="/admin/menu" label="Menu" full />
              </li>
              <li className="col-xs-12 col-md-4">
                <LinkButton href="/admin/gebruikers" label="Gebruikers" full />
              </li>
              <li className="col-xs-12 col-md-4">
                <LinkButton href="/admin/media" label="Media" full />
                <LinkButton href="/admin/media/0" label="Media toevoegen" full />
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Admin;
