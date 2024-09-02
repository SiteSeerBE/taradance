export interface MenuChildProps {
  label: string;
  info: string;
  href: string;
}

export interface MenuItemProps {
  label: string;
  href: string;
  children?: MenuChildProps[];
}
