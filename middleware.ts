import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLogtoId } from "./lib/auth";

const protectedRoutes = ["/admin", "/dashboard", "/afmelden"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAuthenticated = await getLogtoId();

  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/aanmelden", req.url));
  }

  if (pathname === "/aanmelden" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/aanmelden", "/afmelden"],
};
