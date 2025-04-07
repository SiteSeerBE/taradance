import { logtoConfig } from "@/lib/logto";
import { getLogtoContext } from "@logto/next/server-actions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/logintest"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    console.log("User is not authenticated. Redirecting to /login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/signin" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/logintest", "/signin"],
};
