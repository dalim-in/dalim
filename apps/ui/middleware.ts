import { NextRequest, NextResponse } from "next/server";
import { auth } from "@dalim/auth";

// Auth & Redirect Logic
async function authMiddleware(req: NextRequest): Promise<NextResponse | void> {
  const session = await auth();
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
}

// Middleware Entry Point
export async function middleware(req: NextRequest) {
  // Run auth logic first
  const authResponse = await authMiddleware(req);
  if (authResponse) return authResponse;

  // Proceed with cache headers if no redirect happened
  const res = NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/")) {
    res.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
    res.headers.set("CDN-Cache-Control", "public, max-age=3600");
  }
  return res;
}

// Matcher Configuration
export const config = {
  matcher: [
    "/login",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!_next|api|[\\w-]+\\.\\w+).*)"
  ],
  runtime: "nodejs",
};
