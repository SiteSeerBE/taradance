import Link from "next/link";
import { ReactNode } from "react";

const Breadcrumbs: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <nav aria-label="breadcrumb">
      <ul className="w-full">{children}</ul>
    </nav>
  );
};

const Breadcrumb: React.FC<{ href?: string; children: ReactNode }> = ({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) => {
  if (href) {
    return (
      <li>
        <Link href={href}>{children}</Link>
      </li>
    );
  }
  return <li>{children}</li>;
};

export { Breadcrumbs, Breadcrumb };
