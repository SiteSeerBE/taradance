"use client";

import Image from "next/image";
import Link from "next/link";
import { LinkButtonProps } from "@/lib/dataTypes";
import { signIn, signOut, useSession } from "next-auth/react";

const LinkButton: React.FC<LinkButtonProps> = ({ label, href }) => {
  return (
    <Link href={href}>
      <button>{label}</button>
    </Link>
  );
};

export function SignInButton() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <button aria-busy className="secondary" />;
  }

  if (status === "authenticated") {
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
  }

  return (
    <button className="secondary" onClick={() => signIn()}>
      <Image
        src="/icons/account-circle.svg"
        width={24}
        height={24}
        alt="Aanmelden"
      />
    </button>
  );
}

const SignOutButton = () => {
  return <button onClick={() => signOut()}>Afmelden</button>;
};

export { LinkButton, SignOutButton };
