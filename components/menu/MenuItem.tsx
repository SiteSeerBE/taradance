"use client";

import { useEffect, useState, useRef } from "react";

import ActiveLink from "./ActiveLink";
import DropdownContent from "./DropdownContent";
import { MenuItemProps } from "@/data/dataTypes";

const MenuItem: React.FC<MenuItemProps> = ({ label, href, children }) => {
  const [dropdownFor, setDropdownFor] = useState<string | null>(null);
  const dropdownClasses = `dropdown container-fluid ${
    dropdownFor === label ? "show" : "hide"
  }`;
  const menuItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuItemRef.current &&
        !menuItemRef.current.contains(event.target as Node)
      ) {
        setDropdownFor(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <li ref={menuItemRef}>
      <div className="nav-item-content">
        <ActiveLink
          activeClassName="active"
          className={dropdownFor === label ? "active" : ""}
          href={href}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDropdownFor((prev) => (prev === label ? null : label));
          }}
        >
          {label}
        </ActiveLink>
      </div>
      {children && (
        <div className={dropdownClasses}>
          <DropdownContent
            onChangePage={() => setDropdownFor(null)}
            submenuscontent={children}
          />
        </div>
      )}
    </li>
  );
};

export default MenuItem;
