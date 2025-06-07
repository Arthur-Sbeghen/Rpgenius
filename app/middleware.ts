import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas públicas (acessíveis sem autenticação)
const PUBLIC_ROUTES = ["/", "/home", "/login", "/register"];

// Rotas privadas (requerem autenticação)
const PRIVATE_ROUTES = ["/table", "/dashboard", "/profile"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // 1. Redireciona usuários autenticados que tentam acessar rotas públicas
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/table", request.url));
  }

  // 2. Redireciona usuários não autenticados que tentam acessar rotas privadas
  if (PRIVATE_ROUTES.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 3. Opcional: Forçar HTTPS em produção
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
    // Todas as rotas públicas e privadas
    "/auth/:path*",
    "/table/:path*",
    "/dashboard/:path*",
    "/profile/:path*",

    // Opcional: Adicione outras rotas que precisam de proteção
  ],
};
