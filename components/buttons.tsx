"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <button aria-busy="true" aria-label="Please wait..." />;
  }

  if (status === "authenticated") {
    return (
      <Link href={"/dashboard"}>
        <button>
          <Image
            src="/icons/account-circle.svg"
            width={24}
            height={24}
            alt="Member login"
          />
        </button>
      </Link>
    );
  }

  return (
    <button onClick={() => signIn()} className="secondary">
      <Image
        src="/icons/account-circle.svg"
        width={24}
        height={24}
        alt="Member login"
      />
    </button>
  );
}

export function SignOutButton() {
  return (
    <button className="contrast" onClick={() => signOut()}>
      Afmelden
    </button>
  );
}
