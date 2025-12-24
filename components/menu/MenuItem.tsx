"use client";

import { useEffect, useState, useRef } from "react";
import type { Menu } from "@prisma/client";
import ActiveLink from "./ActiveLink";
import DropdownContent from "./DropdownContent";

type PartialMenu = Partial<Menu> & {
  children?: Array<Partial<Menu> | undefined>;
};

const MenuItem: React.FC<PartialMenu> = (props: PartialMenu) => {
  const [dropdownFor, setDropdownFor] = useState<string | null>(null);
  const dropdownClasses = `bg dropdown container-fluid ${
    dropdownFor === props.title ? "show" : "hide"
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
          className={dropdownFor === props.title ? "active" : ""}
          href={props.contentPath!}
          onClick={(e) => {
            if (props.children && props.children.length > 0) {
              e.preventDefault();
              e.stopPropagation();
              // if the link points to the current URL, prevent navigation and do nothing
              const currentPath =
                typeof window !== "undefined" ? window.location.pathname : "";
              if (props.contentPath && props.contentPath != currentPath) {
                setDropdownFor((prev) =>
                  prev === props.title! ? null : props.title!
                );
              }
            }
          }}
        >
          {props.title}
        </ActiveLink>
      </div>
      {props.children && props.children.length > 0 && (
        <div className={dropdownClasses}>
          <DropdownContent
            onChangePage={() => setDropdownFor(null)}
            submenuscontent={props.children.filter(
              (c): c is Partial<Menu> => c !== undefined
            )}
          />
        </div>
      )}
    </li>
  );
};

export default MenuItem;
