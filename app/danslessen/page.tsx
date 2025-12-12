import DropdownContentNoJs from "@/components/menu/DropdownContentNoJs";
import { prisma } from "@/lib/prisma";
import type { Menu } from "@prisma/client";

const MENU_PARENT_ID = 5;

const menuData = await prisma.menu.findMany({
  where: { parentId: MENU_PARENT_ID },
  orderBy: [{ orderId: "asc" }, { id: "asc" }],
  select: {
    id: true,
    contentPath: true,
    description: true,
    title: true,
  },
});

const OverOnsPage = () => {
  return <DropdownContentNoJs submenuscontent={menuData} />;
};

export default OverOnsPage;
