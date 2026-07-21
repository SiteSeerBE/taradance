import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import FourOhFour from "@/components/FourOhFour";
import ImageSet from "@/components/ImageSet";
import { getUserCredentials } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { marked } from "marked";
import Image from "next/image";

type Params = Promise<{ id: string }>;

export default async function AgendaArticle({ params }: { params: Params }) {
  const user = await getUserCredentials();
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
          membersContent: Boolean(user && user.role !== "XXX"),
          repeatId: true,
          timeStart: true,
          timeEnd: true,
          title: true,
          tag: { select: { id: true, name: true } },
        },
        where: { id: eventId },
      });

  if (!event) {
    return <FourOhFour />;
  }

  const {
    date,
    content,
    location,
    media,
    membersContent,
    timeStart,
    timeEnd,
    title,
    tag,
  } = event;

  return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>Agenda</h1>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb href="/agenda">Agenda</Breadcrumb>
            {tag && (
              <Breadcrumb href={`/agenda?tag=${tag.id}`}>{tag.name}</Breadcrumb>
            )}
            <Breadcrumb>{title}</Breadcrumb>
          </Breadcrumbs>
          <hr />
        </hgroup>
      </header>
      <div className="container">
        <h3>{title}</h3>
        {(location || date || membersContent) && (
          <article className="mb1 grid">
            <div>
              {location && (
                <p>
                  <Image
                    src="/icons/location.svg"
                    width={36}
                    height={36}
                    alt="Locatie icoon"
                    className="icon-themed"
                  />{" "}
                  {location}
                </p>
              )}
              {date && (
                <p>
                  <Image
                    src="/icons/calendarEvent.svg"
                    width={36}
                    height={36}
                    alt="Kalender icoon"
                    className="icon-themed"
                  />{" "}
                  {date.toLocaleDateString("nl-BE")}
                </p>
              )}
              {timeStart && (
                <p>
                  <Image
                    src="/icons/clock.svg"
                    width={36}
                    height={36}
                    alt="Klok icoon"
                    className="icon-themed"
                  />{" "}
                  {timeStart}
                  {timeEnd && ` tot ${timeEnd}`}
                </p>
              )}
            </div>
            <div>{/* WIP Product links */}</div>
          </article>
        )}
        {content && (
          <div
            className="mt1"
            dangerouslySetInnerHTML={{ __html: await marked(content) }}
          />
        )}
        {membersContent && (
          <div
            className="mt1"
            dangerouslySetInnerHTML={{
              __html: await marked(membersContent),
            }}
          />
        )}
        {media && (
          <div className="center">
            {<ImageSet image={media} altText={`beeld voor ${title}`} />}
          </div>
        )}
      </div>
    </>
  );
}
