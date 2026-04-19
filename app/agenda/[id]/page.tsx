import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import FourOhFour from "@/components/FourOhFour";
import ImageSet from "@/components/ImageSet";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { marked } from "marked";

type Params = Promise<{ id: string }>;

export default async function AgendaArticle({ params }: { params: Params }) {      
  const { id } = await params;
  const eventId = Number.parseInt(id, 10);

  const event = Number.isNaN(eventId)
    ? null
    : await prisma.event.findUnique({
        select: {
          date: true,
          content: true,
          important: true,
          location: true,
          media: true,
          time: true,
          title: true,
          tag: { select: { id: true, name: true } },
        },
        where: { id: eventId },
      });

  if (!event) {
    return <FourOhFour />;
  }

  const { date, content, location, media, time, title, tag } =
    event;

  return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>Agenda</h1>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb href="/agenda">Agenda</Breadcrumb>
            {tag && <Breadcrumb href={`/agenda?tag=${tag.id}`}>{tag.name}</Breadcrumb>}
            <Breadcrumb>{title}</Breadcrumb>
          </Breadcrumbs>
          <hr />
        </hgroup>
      </header>
      <div className="container">
        <h3>{title}</h3>
        {location && <p>📍 {location}</p>}
        {date && (
          <p>
            📅 {date.toLocaleDateString("nl-BE")}
            {time && ` – ${time}`}
          </p>
        )}
        {content && (
          <div
            className="mt1"
            dangerouslySetInnerHTML={{ __html: await marked(content) }}
          />
        )}
        {media && <div className="center">{<ImageSet image={media} altText={`beeld voor ${title}`} />}</div>}
      </div>
    </>
  );
}
