"use client";
import React from "react";
import { signIn, signOut } from "next-auth/react";

const SignInButton = () => {
  return <button onClick={() => signIn()}>Aanmelden</button>;
};

const SignOutButton = () => {
  return <button onClick={() => signOut()}>Afmelden</button>;
};

export { SignInButton, SignOutButton };
