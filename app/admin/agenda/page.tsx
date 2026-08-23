import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LinkButton } from "@/components/buttons";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";

const Admin: React.FC = async () => {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    select: {
      date: true,
      id: true,
      important: true,
      membersOnly: true,
      title: true,
      author: {
        select: {
          firstName: true,
        },
      },
      tag: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <header className="container-fluid">
        <hgroup>
          <h1>Agenda</h1>
          <Breadcrumbs>
            <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
            <Breadcrumb href="/admin">Administratie</Breadcrumb>
            <Breadcrumb>Agenda</Breadcrumb>
          </Breadcrumbs>
        </hgroup>{" "}
        <LinkButton label="Evenement toevoegen" href="/admin/agenda/0" />
      </header>
      <div className="overflow-auto">
        <table className="striped">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Titel</th>
              <th>Auteur</th>
              <th>Tag</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {events.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.date.toLocaleDateString("nl-BE")}</td>
                  <td>{item.title}</td>
                  <td>{item.author?.firstName}</td>
                  <td>{item.tag?.name}</td>
                  <td style={{ minWidth: "60px" }}>
                    <Link href={`/admin/agenda/${item.id}`}>
                      <img src="/icons/edit.svg" alt="Bewerken" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
