import FourOhFour from "@/components/FourOhFour";
import ImageSet from "@/components/ImageSet";
import { prisma } from "@/lib/prisma";
import classNames from "classnames";
import { marked } from "marked";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const user = await prisma.user.findUnique({ where: { id: params.slug } });
//   return { title: `User profile of ${user?.name}` };
// }

export default async function NewsArticle({ params }: { params: Params }) {
  const { slug } = await params;

  const news = await prisma.news.findUnique({
    select: {
      date: true,
      content: true,
      isAnnouncement: true,
      media: true,
      title: true,
    },
    where: { slug },
  });
  const { date, content, isAnnouncement, media, title } = news ?? {};

  if (!news) {
    return <FourOhFour />;
  }

  return (
    <>
      <div className="backgroundColor breadcrumb container-flex">
        <h1>
          <Link href="/nieuws">&lt; NIEUWS</Link>
        </h1>
      </div>
      <div className="container mt7">
        <div className="relative center image100">
          <span
            className={classNames("dateBox", {
              update: date && date > new Date(),
            })}
          >
            {!isAnnouncement
              ? date?.toLocaleDateString("nl-BE")
              : "AANKONDIGING"}
          </span>
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
