"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { UserContext } from "@/lib/context";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebase";
import { AuthContext } from "@/lib/authProvider";
import { useUserData } from "@/lib/hooks";

const DashboardButton = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <button
        className="secondary"
        aria-busy="true"
        aria-label="Aan het laden..."
      />
    );
  }

  if (!user) {
    return (
      <Link href={"/dashboard"}>
        <button className="secondary">
          <Image
            src="/icons/account-circle.svg"
            width={24}
            height={24}
            alt="Aanmelden"
          />
        </button>
      </Link>
    );
  }

  if (user) {
    const dbUser = useUserData();
    return (
      <Link href={"/dashboard"}>
        <button>
          {dbUser && dbUser.initials ? (
            <span>{dbUser.initials}</span>
          ) : (
            <Image
              src="/icons/account-circle.svg"
              width={24}
              height={24}
              alt="Registreren"
            />
          )}
        </button>
      </Link>
    );
  }
};

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };
  return (
    <>
      <button className="outline" onClick={signInWithGoogle}>
        <img src={"/icons/google.svg"} width="26px" /> Aanmelden met Google
      </button>
    </>
  );
};

const SignOutButton = () => {
  return (
    <>
      <button onClick={() => auth.signOut()}>Afmelden</button>
    </>
  );
};

export { DashboardButton, SignInButton, SignOutButton };
