import { NextRequest, NextResponse } from "next/server";

const PRIVATE_ROUTES = ["/knowledge", "/dashboard"];
const ACCESS_COOKIE = "wk-access";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivate = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
  if (!isPrivate) return NextResponse.next();

  const cookie = request.cookies.get(ACCESS_COOKIE);
  if (cookie?.value === process.env.PRIVATE_ACCESS_SECRET) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/knowledge/:path*", "/dashboard/:path*"],
};
