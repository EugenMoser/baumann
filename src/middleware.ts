import { NextResponse } from "next/server";
import { auth } from "src/auth";

export default auth((request) => {
  const protectedRoutes = ["/dashboard"];
  const { pathname } = request.nextUrl;
  const isLoggedIn = !!request.auth;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.nextUrl);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
});
export const config = {
  matcher: ["/dashboard/:path*"],
};
