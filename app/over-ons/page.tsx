import DropdownContentNoJs from "@/components/menu/DropdownContentNoJs";
import { prisma } from "@/lib/prisma";
import type { Menu } from "@prisma/client";

const OVER_ONS_PARENT_ID = 4;
const menuData = await prisma.menu.findMany({
  where: { parentId: OVER_ONS_PARENT_ID },
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
