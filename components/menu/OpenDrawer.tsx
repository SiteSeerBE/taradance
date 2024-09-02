"use client";

import React from "react";
import { usePathname } from "next/navigation";

const OpenDrawer: React.FC = () => {
  const pathname = usePathname();
  return (
    <input
      key={pathname}
      type="checkbox"
      id="aside"
      className="hidden-xs hidden-sm"
    />
  );
};

export default OpenDrawer;
