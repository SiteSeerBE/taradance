import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

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

export interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

export interface DbUser {
  roles: string[];
}

export type { DocumentData, User };
