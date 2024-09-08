import { Link, Image } from "@/components/baseImport";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.scss";
import "./flexboxgrid.scss";
import MegaMenu from "@/components/menu/MegaMenu";
import MobileNavigationDrawer from "@/components/menu/MobileNavigationDrawer";
import OpenDrawer from "@/components/menu/OpenDrawer";
import { DashboardButton } from "@/components/buttons";
import { AuthProvider } from "@/lib/authProvider";

const raleway = Raleway({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" data-theme="light">
        <body className={raleway.className}>
          <header className="menu">
            <Link style={{ display: "flex", alignItems: "center" }} href={"/"}>
              <Image
                src="/taradance.svg"
                width={150}
                height={46}
                alt="NextSpace Logo"
              />
            </Link>
            <div className="nav-container">
              <MegaMenu />
            </div>
            <div className="flex flex-right first-xs last-sm">
              <Link href={"/login"}>
                <button>Boek&nbsp;ons!</button>
              </Link>
              <span className="hidden-xs">
                <DashboardButton />
              </span>
            </div>
            <div className="hidden-sm last-xs">
              <label className="hamburger" htmlFor="aside">
                <Image
                  src="/icons/menu.svg"
                  width={46}
                  height={46}
                  alt="Menu"
                />
              </label>
            </div>
          </header>
          <OpenDrawer />
          <label htmlFor="aside" className="overlay" />
          <aside className="hidden-sm">
            <label htmlFor="aside" className="close">
              <Image
                src="/icons/close.svg"
                width={46}
                height={46}
                alt="Member login"
              />
            </label>
            <nav className="mobileNavigationDrawer">
              <MobileNavigationDrawer />
              <div className="row end-xs">
                <DashboardButton />
                <div className="col-xs-1" />
              </div>
            </nav>
          </aside>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
