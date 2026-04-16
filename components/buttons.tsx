"use client";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { LinkButtonProps } from "@/lib/dataTypes";
import { useTheme } from "@/app/context/use-theme";

const LinkButton: React.FC<LinkButtonProps> = (props: LinkButtonProps) => {
  return (
    <Link href={props.href} className="block">
      <button className={classNames({ "w-full": props.full })}>
        {props.label}
      </button>
    </Link>
  );
};

const DashboardButton: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  return (
    <a target="_blank" href="https://starter.swingit.be/s521/">
      <button>
        <Image
          src="/icons/account-circle.svg"
          width={24}
          height={24}
          alt="Dashboard"
        />
      </button>
    </a>
  );
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
