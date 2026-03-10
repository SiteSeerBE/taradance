import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boek ons | Taradance | Irish Dance | Kapelle-op-den-Bos",
};

export default function BoekOnsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}