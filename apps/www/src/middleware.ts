import { betterFetch } from "@better-fetch/fetch"
import { NextResponse, type NextRequest } from "next/server"
import type { Session } from "@/src/lib/auth/auth"

const authRoutes = ["/sign-in", "/sign-up"]
const passwordRoutes = ["/reset-password", "/forgot-password"]

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const isAuthRoute = authRoutes.some((route) => pathName === route)
  const isPasswordRoute = passwordRoutes.some((route) => pathName === route)
  const isAdminRoute = pathName.startsWith("/admin")

  try {
    const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    })

    // If no session, redirect to sign-in except for auth and password routes
    if (!session) {
      if (isAuthRoute || isPasswordRoute) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    // If user is logged in and tries to access auth routes, redirect to home
    if (isAuthRoute || isPasswordRoute) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // For admin routes, check if user has ADMIN role
    if (isAdminRoute) {
      // Add debugging to see what's happening
      console.log("Admin route accessed:", pathName)
      console.log("User role:", session.user.role)

      if (session.user.role !== "ADMIN") {
        console.log("Non-admin user tried to access admin route")
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)

    // If there's an error fetching the session, redirect to sign-in
    // except for auth and password routes
    if (isAuthRoute || isPasswordRoute) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
