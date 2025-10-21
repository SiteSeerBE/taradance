import FourOhFour from "@/components/FourOhFour";
import { prisma } from "@/lib/prisma";
import classNames from "classnames";
import { marked } from "marked";

type Params = Promise<{ slug: string }>;

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const user = await prisma.user.findUnique({ where: { id: params.slug } });
//   return { title: `User profile of ${user?.name}` };
// }

export default async function Content({ params }: { params: Params }) {
  const { slug } = await params;
  const content = await prisma.page.findUnique({
    where: { slug },
    include: { parts: { orderBy: { orderId: "asc" } } },
  });
  if (!content) {
    return <FourOhFour />;
  }
  return (
    <>
      <header className="container mt1">
        <hgroup>
          <h1>{content.title}</h1>
          <hr />
        </hgroup>
      </header>
      <div className="container">
        {content.parts.map((part) => (
          <div
            className={classNames("row", { reverse: part.mediaLocation === 2 })}
            key={part.id}
          >
            <div
              className={classNames("mb1", {
                "col-md-12": part.mediaLocation == 0,
                "col-md-6": part.mediaLocation == 1 || part.mediaLocation == 2,

                "col-md-offset-1": part.mediaLocation == 2,
              })}
              dangerouslySetInnerHTML={{ __html: marked(part.content || "") }}
            />
            <div
              key={part.id}
              className={classNames("mb1", {
                "col-md-12": part.mediaLocation == 0,
                "col-md-4 col-md-offset-1": part.mediaLocation == 1,
              })}
            >
              {part.mediaPath && (
                <div className="relative center image100">
                  <img
                    src={part.mediaPath}
                    alt={`Media for part ${part.orderId}`}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
