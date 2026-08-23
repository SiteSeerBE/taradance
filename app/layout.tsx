import "./globals.scss";
import "./flexboxgrid.scss";
import Image from "next/image";
import Link from "next/link";
import MegaMenu from "@/components/menu/MegaMenu";
import MobileNavigationDrawer from "@/components/menu/MobileNavigationDrawer";
import OpenDrawer from "@/components/menu/OpenDrawer";
import SiteFooter from "@/components/menu/SiteFooter";
import ThemeProvider from "./context/theme-provider";
import type { Metadata } from "next";
import { DashboardButton, ThemeSwitchButton } from "@/components/buttons";
import { Raleway } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { getLogtoId } from "@/lib/auth";

const raleway = Raleway({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scoil Rince Celtus Belgium | Irish Dance | Kapelle-op-den-Bos",
  description: "School voor Ierse dans in Kapelle-op-den-Bos",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await getLogtoId();
  return (
    <html lang="en" data-theme="light" data-color-mode="light">
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <body className={raleway.className}>
        <ThemeProvider>
          <div className="col-xs-col-sm-8 col-sm-offset-2">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.trooper.be/nl/trooperverenigingen/taradance/"
            >
              <img src="/banner/delhaize.png" alt="Delhaize Banner" />
            </a>
          </div>
          <header className="bg menu">
            <Link style={{ display: "flex", alignItems: "center" }} href={"/"}>
              <img
                className="taraLogo"
                src="/taradance.svg"
                width={150}
                alt="Scoil Rince Celtus Logo"
              />
            </Link>
            <div className="nav-container">
              <MegaMenu />
            </div>
            <div className="flex flex-right first-xs last-sm">
              <span className="hidden-xs">
                <ThemeSwitchButton />
              </span>
              <span className="hidden-xs">
                <DashboardButton isAuthenticated={!!isAuthenticated} />
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
          <aside id="mobileMenu" className="bg hidden-sm">
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
                <ThemeSwitchButton />
                &nbsp;
                <DashboardButton isAuthenticated={!!isAuthenticated} />
                <div className="col-xs-1" />
              </div>
            </nav>
          </aside>
          {children}
          <footer>
            <div className="container">
              <SiteFooter />
            </div>
            <div className="col-sm-8 col-sm-offset-2">
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.trooper.be/nl/trooperverenigingen/taradance/"
              >
                <img src="/banner/trooper.png" alt="Trooper Banner" />
              </a>
            </div>
            <p className="container footer__copyright">
              &copy; {new Date().getFullYear()} Scoil Rince Celtus Belgium
            </p>
          </footer>
          <Toaster position="bottom-center" reverseOrder={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
