import ImageSet from "@/components/ImageSet";
import { prisma } from "@/lib/prisma";
import { marked } from "marked";

interface Props {
  params: {
    slug: string;
  };
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const user = await prisma.user.findUnique({ where: { id: params.slug } });
//   return { title: `User profile of ${user?.name}` };
// }

export default async function NewsArticle({ params }: Props) {
  const news = await prisma.news.findUnique({
    select: {
      date: true,
      content: true,
      media: true,
      title: true,
    },
    where: { slug: params.slug },
  });
  const { date, content, media, title } = news ?? {};

  return (
    <>
      <div className="breadcrumb center container-flex">
        <h1>NIEUWS</h1>
      </div>
      <div className="container mt7">
        <div className="relative center image100">
          <span className="dateBox">{date?.toLocaleDateString("nl-BE")}</span>
          {media && <ImageSet image={media} altText={`beeld voor ${title}`} />}
        </div>
        <h3 className="mt1">{title}</h3>
        {content && (
          <div
            className="mt1"
            dangerouslySetInnerHTML={{ __html: await marked(content || "") }}
          />
        )}
      </div>
    </>
  );
}
