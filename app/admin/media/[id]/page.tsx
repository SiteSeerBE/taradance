import { prisma } from "@/lib/prisma";
import MediaUpdateForm from "@/components/media/MediaUpdateForm";

type Params = Promise<{ id: string }>;

export default async function MediaEdit({ params }: { params: Params }) {
  const { id } = await params;
  const mediaId = Number.parseInt(id, 10);
  const media = Number.isNaN(mediaId)
    ? null
    : await prisma.media.findUnique({ where: { id: mediaId } });
  const tags = await prisma.tag.findMany({ orderBy: { name: "asc" } });

  return <MediaUpdateForm media={media} tags={tags} />;
}