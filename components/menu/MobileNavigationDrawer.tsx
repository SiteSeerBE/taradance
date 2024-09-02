import React from "react";
import Link from "next/link";

import { menuData } from "@/data/menuData";

const MobileNavigationDrawer: React.FC = () => {
  return (
    <section className="accordion">
      {menuData.map(({ label, href, children }, index) => {
        return (
          <React.Fragment key={index}>
            {children && (
              <div className="tab">
                <input type="checkbox" id={`cb-${index}`} />
                <label
                  htmlFor={`cb-${index}`}
                  className="tab__label"
                  style={{ width: "100%" }}
                >
                  <a>{label}</a>
                  <span className="rotatable">&gt;</span>
                </label>
                <div className="tab__content">
                  <ul>
                    {children.map(({ label, href }, index) => {
                      return (
                        <li key={index}>
                          <Link href={href}>{label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
            {!children && (
              <div className="tab">
                <label className="tab__label">
                  <Link href={href}>{label}</Link>
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
