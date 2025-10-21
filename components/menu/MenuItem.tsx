"use client";

import { useEffect, useState, useRef } from "react";
import type { Menu } from "@prisma/client";
import ActiveLink from "./ActiveLink";
import DropdownContent from "./DropdownContent";

const MenuItem: React.FC<
  Partial<Menu> & { children?: Array<Partial<Menu> | undefined> }
> = ({ title, contentPath, children }) => {
  const [dropdownFor, setDropdownFor] = useState<string | null>(null);
  const dropdownClasses = `bg dropdown container-fluid ${
    dropdownFor === title ? "show" : "hide"
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
          className={dropdownFor === title ? "active" : ""}
          href={contentPath!}
          onClick={(e) => {
            if (children && children.length > 0) {
              e.preventDefault();
              e.stopPropagation();
              // if the link points to the current URL, prevent navigation and do nothing
              const currentPath =
                typeof window !== "undefined" ? window.location.pathname : "";
              if (contentPath && contentPath != currentPath) {
                setDropdownFor((prev) => (prev === title! ? null : title!));
              }
            }
          }}
        >
          {title}
        </ActiveLink>
      </div>
      {children && children.length > 0 && (
        <div className={dropdownClasses}>
          <DropdownContent
            onChangePage={(contentPath: string) => setDropdownFor(null)}
            submenuscontent={children.filter(
              (c): c is Partial<Menu> => c !== undefined
            )}
          />
        </div>
      )}
    </li>
  );
};

export default MenuItem;
