import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LinkButton } from "@/components/buttons";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";

const Inhoud: React.FC = async () => {
  const pages = await prisma.page.findMany({
    orderBy: { title: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      author: true,
    },
  });
  const menu = await prisma.menu.findMany({
    select: {
      id: true,
      contentPath: true,
    },
  });
  const menuSlugs = menu.map((item) => {
    const parts = item.contentPath.split("/");
    return parts[parts.length - 1];
  });
  return (
    <>
      <header className="container-fluid">
        <hgroup>
          <h1>Inhoud</h1>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
            <Breadcrumb href="/admin">Administratie</Breadcrumb>
            <Breadcrumb>Inhoud</Breadcrumb>
          </Breadcrumbs>
        </hgroup>
        <LinkButton label="Pagina toevoegen" href="/admin/inhoud/toevoegen" />
      </header>
      <div className="overflow-auto">
        <table className="striped">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Auteur</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td>
                  <Link href={`/inhoud/${page.slug}`}>{page.title}</Link>
                </td>
                <td>{page.author?.firstName}</td>
                <td style={{ minWidth: "60px" }}>
                  <Link href={`/admin/inhoud/${page.slug}`}>
                    <img
                      src="/icons/edit.svg"
                      alt="Bewerken"
                      title="Bewerken"
                    />
                  </Link>
                </td>
                <td style={{ minWidth: "60px" }}>
                  {!menuSlugs.includes(page.slug) && (
                    <Link
                      href={`/admin/menu/0?title=${page.title}&slug=${page.slug}`}
                    >
                      <img
                        src="/icons/add.svg"
                        alt="Toevoegen aan menu"
                        title="Toevoegen aan menu"
                      />
                    </Link>
                  )}
                </td>
                <td style={{ minWidth: "65px" }}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Inhoud;
