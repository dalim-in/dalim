import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@dalim/auth";

const authRoutes = ["/login", "/signup"];
const passwordRoutes = ["/reset-password", "/forgot-password"];
const adminRoutes = ["/admin"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.includes(pathName);
  const isPublicRoute = pathName === "/"; // 👈 Make homepage public

  let session: Session | null = null;

  try {
    const { data } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: process.env.DALIM_URL,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      },
    );
    session = data ?? null;
  } catch (err) {
    console.error("Failed to fetch session:", err);
  }

  // ✅ If route is public or auth/password route and no session, allow
  if (!session) {
    if (isAuthRoute || isPasswordRoute || isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url)); // 👈 Redirect to login instead
  }

  // ✅ Prevent access to login/signup when already logged in
  if (isAuthRoute || isPasswordRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Restrict admin route access
  if (isAdminRoute && session.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
