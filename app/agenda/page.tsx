// page that shows the agenda using DayItem component
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import AgendaFilter from "@/components/event/AgendaFilter";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{ tag?: string }>;

const Agenda: React.FC<{ searchParams: SearchParams }> = async ({ searchParams }) => {
    const { tag } = await searchParams;
    const initialTag = tag ? Number.parseInt(tag, 10) : null;
    const [events, tags] = await Promise.all([
        prisma.event.findMany({
            orderBy: { date: "asc" },
            select: {
                date: true,
                id: true,
                tag: { select: { name: true, color: true } },
                time: true,
                title: true,
            },
        }),
        prisma.tag.findMany({ orderBy: { name: "asc" } }),
    ]);

    return (
        <>
            <header className="container mt1">
                <hgroup>
                    <h1>Agenda</h1>
                    <Breadcrumbs>
                        <Breadcrumb href="/">Taradance</Breadcrumb>
                        <Breadcrumb>Agenda</Breadcrumb>
                    </Breadcrumbs>
                </hgroup>
            </header>
            <AgendaFilter events={events} initialTag={initialTag} tags={tags} />
        </>
    );
}

export default Agenda;
