import { LinkButton } from "@/components/buttons";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const Admin: React.FC = async () => {
  const news = await prisma.news.findMany({
    orderBy: { date: "desc" },
    select: {
      date: true,
      id: true,
      isAnnouncement: true,
      isPublished: true,
      media: true,
      slug: true,
      title: true,
      author: {
        select: {
          firstName: true,
        },
      },
    },
  });

  const visibleAnnouncementPosition = news
    .map((item, index) => ({
      ...item,
      index,
    }))
    .reverse()
    .findIndex((item) => {
      return item.isPublished && item.isAnnouncement && item.date > new Date();
    });

  const visibleAnnouncement =
    news[news.length - visibleAnnouncementPosition - 1]?.id;

  return (
    <>
      <header className="container-fluid">
        <hgroup>
          <h1>Nieuws</h1>
          <p>Beheer het nieuws op de website.</p>
        </hgroup>{" "}
        <LinkButton
          label="Nieuwsbericht toevoegen"
          href="/admin/nieuws/toevoegen"
        />
      </header>
      <div className="overflow-auto">
        <table className="striped">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Titel</th>
              <th>Auteur</th>
              <th data-tooltip="Aankondiging">A</th>
              <th data-tooltip="Gepubliceerd">P</th>
              <th data-tooltip="Zichtbaar">Z</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => {
              const visible =
                (item.isPublished &&
                  !item.isAnnouncement &&
                  item.date <= new Date()) ||
                item.id == visibleAnnouncement;
              let tooltip = null;
              if (!visible) {
                if (
                  item.isPublished &&
                  item.isAnnouncement &&
                  item.date <= new Date()
                ) {
                  tooltip = "Aankondiging heeft datum in het verleden.";
                } else if (
                  item.isPublished &&
                  !item.isAnnouncement &&
                  item.date > new Date()
                ) {
                  tooltip = "Nieuwsbericht heeft datum in de toekomst.";
                } else if (!item.isPublished) {
                  tooltip = "Bericht is niet gepubliceerd.";
                } else if (item.isAnnouncement) {
                  tooltip =
                    "Enkel de eerstvolgende aankondiging wordt getoond.";
                }
              }

              return (
                <tr key={item.id}>
                  <td>{item.date.toLocaleDateString("nl-BE")}</td>
                  <td>
                    <Link href={`/nieuws/${item.slug}`}>{item.title}</Link>
                  </td>
                  <td>{item.author?.firstName}</td>
                  <td>
                    <input
                      readOnly
                      type="checkbox"
                      checked={item.isAnnouncement}
                    />
                  </td>
                  <td>
                    <input
                      readOnly
                      type="checkbox"
                      checked={item.isPublished}
                    />
                  </td>
                  <td>
                    <input
                      data-tooltip={tooltip}
                      readOnly
                      type="checkbox"
                      checked={visible}
                    />
                  </td>
                  <td>
                    <Link href={`/admin/nieuws/${item.slug}`}>
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
