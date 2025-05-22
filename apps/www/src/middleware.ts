import { NextRequest, NextResponse } from "next/server";
import { auth } from "@dalim/auth";

export { auth as middleware } from "@dalim/auth";

export default async function middleware(req: NextRequest) {
  const session = await auth(); // ✅ Get session manually
  const isAuthenticated = !!session;

  const pathname = req.nextUrl.pathname;
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!isAuthenticated && !isHomePage && !isLoginPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!_next|api|[\\w-]+\\.\\w+).*)"
  ],
  runtime: "nodejs", // avoids Edge runtime issues like MessageChannel errors
};
