import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import MediaFilter from "@/components/media/MediaFilter";
import { getLogtoId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{ tag?: string }>;

const Media: React.FC<{ searchParams: SearchParams }> = async ({ searchParams }) => {
  const logtoId = await getLogtoId();
  const { tag } = await searchParams;
  const parsedTag = tag ? Number.parseInt(tag, 10) : Number.NaN;
  const initialTag = Number.isNaN(parsedTag) ? null : parsedTag;

  const [mediaItems, tags] = await Promise.all([
    prisma.media.findMany({
      orderBy: { date: "desc" },
      select: {
        id: true,
        title: true,
        date: true,
        imagePath: true,
        path: true,
        membersPath: Boolean(logtoId),
        tag: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.tag.findMany({
      where: {
        media: {
          some: {},
        },
      },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    }),
  ]);

  return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>Foto&apos;s en Video&apos;s</h1>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb href="/inhoud">Inhoud</Breadcrumb>
            <Breadcrumb>Foto&apos;s en Video&apos;s</Breadcrumb>
          </Breadcrumbs>
        </hgroup>
      </header>

      <MediaFilter mediaItems={mediaItems} initialTag={initialTag} tags={tags} />
    </>
  );
};

export default Media;
