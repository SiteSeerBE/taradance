import React from "react";
import MenuItem from "./MenuItem";

import { menuData } from "@/data/menuData";

const MegaMenu = () => {
  return (
    <div className="nav__container">
      <nav>
        <ul>
          {menuData.map(({ label, href, children }, index) => {
            return <MenuItem key={index} {...{ label, href, children }} />;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MegaMenu;
