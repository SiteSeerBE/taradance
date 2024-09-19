export type AriaInvalid =
  | boolean
  | "false"
  | "true"
  | "grammar"
  | "spelling"
  | undefined;

export interface LinkButtonProps {
  label: string;
  href: string;
}

export interface DbUser {
  roles: string[];
}

export interface HomeArticleData {
  buttons: LinkButtonProps[];
  content: string;
  image: string;
  title: string;
}

export interface HomeArticleProps extends HomeArticleData {
  id: string;
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
