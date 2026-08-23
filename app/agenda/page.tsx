// page that shows the agenda using DayItem component
import PropTypes from "prop-types";
import AgendaFilter from "@/components/event/AgendaFilter";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{ tag?: string }>;

const SearchParamsProp = PropTypes.oneOfType([
  PropTypes.instanceOf(Promise),
  PropTypes.shape({
    tag: PropTypes.string,
  }),
]) as PropTypes.Requireable<SearchParams>;

const Agenda: React.FC<{ searchParams: SearchParams }> = async ({
  searchParams,
}) => {
  const { tag } = await searchParams;
  const initialTag = tag ? Number.parseInt(tag, 10) : null;
  const [events, tags] = await Promise.all([
    prisma.event.findMany({
      orderBy: { date: "asc" },
      select: {
        date: true,
        id: true,
        tag: { select: { name: true, color: true } },
        timeStart: true,
        title: true,
      },
      where: {
        date: {
          gte: new Date(),
        },
      },
    }),
    prisma.tag.findMany({
      orderBy: { name: "asc" },
      where: {
        events: {
          some: {},
        },
      },
    }),
  ]);

  return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>Agenda</h1>
        </hgroup>
      </header>
      <AgendaFilter events={events} initialTag={initialTag} tags={tags} />
    </>
  );
};

Agenda.propTypes = {
  searchParams: SearchParamsProp.isRequired,
};

export default Agenda;
