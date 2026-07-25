import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLogtoId, getUserIdForRole } from "./lib/auth";
import { RoleType } from "@prisma/client";

const protectedRoutes = ["/admin", "/dashboard", "/afmelden"];

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // API admin routes - check admin role
  if (pathname.startsWith("/api/admin")) {
    const userId = await getUserIdForRole([RoleType.ADMIN]);
    if (!userId) {
      return NextResponse.json(
        { error: "You don't have access on this route." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

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
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/aanmelden",
    "/afmelden",
    "/api/admin/:path*",
  ],
};
