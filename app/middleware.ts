import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/home", "/login", "/register"];

const PRIVATE_ROUTES = ["/table", "/dashboard", "/profile"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/table", request.url));
  }

  if (PRIVATE_ROUTES.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    process.env.NODE_ENV === "production" &&
    !request.nextUrl.protocol.startsWith("https")
  ) {
    return NextResponse.redirect(
      new URL(
        `https://${request.nextUrl.host}${request.nextUrl.pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/table/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
