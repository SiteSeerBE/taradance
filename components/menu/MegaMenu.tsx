import MenuItem from "@/components/menu/MenuItem";
import { prisma } from "@/lib/prisma";

const MegaMenu = async () => {
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
    <div className="nav__container">
      <nav>
        <ul>
          {menuData.map(({ title, contentPath, children }, index) => {
            return (
              <MenuItem key={index} {...{ title, contentPath, children }} />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MegaMenu;
