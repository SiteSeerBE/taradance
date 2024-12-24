"use client";

import Image from "next/image";
import Link from "next/link";
import { LinkButtonProps } from "@/lib/dataTypes";
import { useSession } from "next-auth/react";
import { useTheme } from "@/app/context/use-theme";

const LinkButton: React.FC<LinkButtonProps> = ({ label, href }) => {
  return (
    <Link href={href}>
      <button>{label}</button>
    </Link>
  );
};

const DashboardButton = () => {
  const { status } = useSession();
  switch (status) {
    case "loading":
      return <button aria-busy className="secondary" />;
    case "unauthenticated":
      return (
        <Link href={`/dashboard`}>
          <button className="secondary">
            <Image
              src="/icons/account-circle.svg"
              width={24}
              height={24}
              alt="Dashboard"
            />
          </button>
        </Link>
      );
    case "authenticated":
      return (
        <Link href={`/dashboard`}>
          <button>
            <Image
              src="/icons/account-circle.svg"
              width={24}
              height={24}
              alt="Dashboard"
            />
          </button>
        </Link>
      );
    default:
      return null;
  }
};

const ThemeSwitchButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Image
        src={
          theme === "light" ? "/icons/light.svg" : ("/icons/dark.svg" as string)
        }
        width={24}
        height={24}
        alt="Theme Toggle"
      />
    </button>
  );
};

export { DashboardButton, LinkButton, ThemeSwitchButton };
