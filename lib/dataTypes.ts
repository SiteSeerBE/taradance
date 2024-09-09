import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

export interface LinkButtonProps {
  label: string;
  href: string;
}

export interface DbUser {
  roles: string[];
}

export interface HomeArticleProps {
  buttons: LinkButtonProps[];
  content: string;
  image: string;
  title: string;
}

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

export type { DocumentData, User };
