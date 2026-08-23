"use client";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { LinkButtonProps } from "@/lib/dataTypes";

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
    <Link href={`/dashboard`}>
      <button className={classNames({ secondary: !isAuthenticated })}>
        <Image
          src="/icons/account-circle.svg"
          width={24}
          height={24}
          alt="Dashboard"
        />
      </button>
    </Link>
  );
};

export { DashboardButton, LinkButton };
