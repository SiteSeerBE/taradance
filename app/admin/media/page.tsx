import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LinkButton } from "@/components/buttons";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";

const MediaAdmin: React.FC = async () => {
    const mediaItems = await prisma.media.findMany({
        orderBy: { date: "desc" },
        select: {
            id: true,
            date: true,
            membersPath: true,
            path: true,
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
                    <h1>Media</h1>
                    <Breadcrumbs>
                        <Breadcrumb href="/">Taradance</Breadcrumb>
                        <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
                        <Breadcrumb href="/admin">Administratie</Breadcrumb>
                        <Breadcrumb>Media</Breadcrumb>
                    </Breadcrumbs>
                </hgroup>
                <LinkButton label="Media toevoegen" href="/admin/media/0" />
            </header>

            <div className="overflow-auto">
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Titel</th>
                            <th>Tag</th>
                            <th>Auteur</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mediaItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.date.toLocaleDateString("nl-BE")}</td>
                                <td>{item.title}</td>
                                <td>{item.tag?.name}</td>
                                <td>{item.author?.firstName}</td>
                                <td style={{ minWidth: "60px" }}>
                                    <Link href={`/admin/media/${item.id}`}>
                                        <img src="/icons/edit.svg" alt="Bewerken" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MediaAdmin;