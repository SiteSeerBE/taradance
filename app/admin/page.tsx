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
      <div className="container">
        <div className="row">
          <details
            name="admin-overview"
            className="col-xs-12 col-sm-6 col-md-4"
          >
            <summary role="button">Overzicht</summary>
            <LinkButton href="/admin/agenda" label="Agenda" full />
            <LinkButton href="/admin/nieuws" label="Nieuws" full />
            <LinkButton href="/admin/menu" label="Menu" full />
            <LinkButton href="/admin/product" label="Producten" full />
            <LinkButton href="/admin/inhoud" label="Paginas" full />
          </details>
          <details name="admin-new" className="col-xs-12 col-sm-6 col-md-4">
            <summary role="button">Toevoegen</summary>
            <LinkButton href="/admin/agenda/0" label="Agenda item" full />
            <LinkButton
              href="/admin/nieuws/toevoegen"
              label="Nieuws item"
              full
            />
            <LinkButton href="/admin/menu/0" label="Menu item" full />
            <LinkButton href="/admin/product/0" label="Product" full />
            <LinkButton href="/admin/inhoud/toevoegen" label="Pagina" full />
          </details>
          <details name="admin-members" className="col-xs-12 col-sm-6 col-md-4">
            <summary role="button">Ledenbeheer</summary>
            <LinkButton href="/admin/gebruikers" label="Gebruikers" full />
          </details>
        </div>
      </div>
    </>
  );
};

export default Admin;
