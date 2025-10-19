import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumb, Breadcrumbs } from "@/components/breadcrumbs";
import MenuOrderSelect from "@/components/admin/MenuOrderSelect";

const Menu: React.FC = async () => {
  const menu = await prisma.menu.findMany({
    orderBy: [{ orderId: "asc" }, { id: "asc" }],
    select: {
      id: true,
      title: true,
      description: true,
      parentId: true,
      orderId: true,
    },
  });
  return (
    <>
      <header className="container-fluid">
        <hgroup>
          <h1>Menu</h1>
          <Breadcrumbs>
            <Breadcrumb href="/">Taradance</Breadcrumb>
            <Breadcrumb href="/dashboard">Dashboard</Breadcrumb>
            <Breadcrumb href="/admin">Administratie</Breadcrumb>
            <Breadcrumb>Menu</Breadcrumb>
          </Breadcrumbs>
        </hgroup>
      </header>
      <div className="overflow-auto">
        <table className="striped">
          <thead>
            <tr>
              <th>Naam</th>
              <th>Beschrijving</th>
              <th>Niveau</th>
              <th>Volgorde</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {menu
              .filter((item) => !item.parentId) // Only parent items
              .map((parent) => (
                <React.Fragment key={parent.id}>
                  <tr>
                    <td>
                      <b>{parent.title}</b>
                    </td>
                    <td>{parent.description}</td>
                    <td>Hoofdmenu</td>
                    <td>&nbsp;</td>
                    <td style={{ minWidth: "60px" }}>&nbsp;</td>
                    <td style={{ minWidth: "65px" }}>&nbsp;</td>
                  </tr>
                  {menu
                    .filter((child) => child.parentId === parent.id)
                    .map((child) => (
                      <tr key={child.id}>
                        <td style={{ paddingLeft: "2em" }}>{child.title}</td>
                        <td>{child.description}</td>
                        <td>Submenu</td>
                        <td>
                          <MenuOrderSelect
                            id={child.id}
                            initial={child.orderId}
                          />
                        </td>
                        <td style={{ minWidth: "60px" }}>
                          <Link href={`/admin/nieuws/${child.id}`}>
                            <img src="/icons/edit.svg" alt="Bewerken" />
                          </Link>
                        </td>
                        <td style={{ minWidth: "65px" }}>&nbsp;</td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Menu;
