import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLogtoId } from "./lib/auth";

const protectedRoutes = ["/dashboard", "/test", "/admin"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAuthenticated = await getLogtoId();

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/aanmelden", req.url));
  }

  if (pathname === "/aanmelden" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/test", "/aanmelden", "/afmelden"],
};
