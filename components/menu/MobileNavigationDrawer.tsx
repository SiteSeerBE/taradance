import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const MobileNavigationDrawer = async () => {
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
          description: true,
          title: true,
        },
      },
    },
  });

  return (
    <section className="accordion">
      {menuData.map(({ id, title, contentPath, children }) => {
        return (
          <React.Fragment key={id}>
            {children && children.length > 0 ? (
              <div className="tab">
                <input type="checkbox" id={`cb-${id}`} />
                <label
                  htmlFor={`cb-${id}`}
                  className="tab__label"
                  style={{ width: "100%" }}
                >
                  <a>{title}</a>
                  <span className="rotatable">&gt;</span>
                </label>
                <div className="tab__content">
                  <ul>
                    {children.map(
                      ({ id: cid, title: ctitle, contentPath: chref }) => {
                        return (
                          <li key={cid}>
                            <Link href={chref ?? "#"}>{ctitle}</Link>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="tab">
                <label className="tab__label">
                  <Link href={contentPath ?? "#"}>{title}</Link>
                </label>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </section>
  );
};

export default MobileNavigationDrawer;
