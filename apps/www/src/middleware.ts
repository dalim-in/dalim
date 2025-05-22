import { NextRequest, NextResponse } from "next/server";

import { auth } from "@dalim/auth";

export { auth as middleware } from "@dalim/auth";

export default auth(async (req: NextRequest) => {
  
  const isAuthenticated = await auth();

  const pathname = req.nextUrl.pathname;
  const isSignInPage = pathname === "/login";

  if (isSignInPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!isAuthenticated && !isSignInPage) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/login", "/((?!api|_next/static|_next/image|favicon.ico).*)", "/((?!_next|api|[\\w-]+\\.\\w+).*)"],
};
