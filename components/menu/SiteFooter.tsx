import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Reuses the same Menu tree the header navigation is built from, so the
// footer sitemap always lists every page that's actually in the site menu.
const SiteFooter = async () => {
  const menuData = await prisma.menu.findMany({
    where: { parentId: null },
    orderBy: [{ orderId: "asc" }, { id: "asc" }],
    select: {
      id: true,
      contentPath: true,
      title: true,
      children: {
        orderBy: [{ orderId: "asc" }, { id: "asc" }],
        select: {
          id: true,
          contentPath: true,
          title: true,
        },
      },
    },
  });

  return (
    <nav className="grid footer__sitemap" aria-label="Sitemap">
      <div>
        <img
          className="taraLogo footer__logo"
          src="/src_with_words.svg"
          width={150}
          alt="Scoil Rince Celtus Logo"
        />
        <p>
          <small>
            Scoil Rince Celtus Belgium is een dansschool voor Ierse dans in
            Kapelle-op-den-Bos.
          </small>
        </p>
      </div>
      <div>
        <strong>Socials</strong>
        <div>
          <small>
            <a
              href="https://www.facebook.com/taradancebelgium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <br />
            <a
              href="https://www.instagram.com/src.irishdancebelgium/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <br />
          </small>
          <small>
            <a
              href="https://www.youtube.com/@TaradanceOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </small>
        </div>
      </div>
      {menuData.map(({ id, title, contentPath, children }) => (
        <div key={id}>
          <Link href={contentPath || "#"}>
            <strong>{title}</strong>
          </Link>
          {children.length > 0 && (
            <div>
              {children.map((child) => (
                <div key={child.id}>
                  <small>
                    <Link href={child.contentPath || "#"}>{child.title}</Link>
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default SiteFooter;
