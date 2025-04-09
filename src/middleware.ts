import { NextResponse } from "next/server";
import { auth } from "src/auth";

export default auth((req) => {
  const protectedRoutes = [
    "/dashboard",
    "/projects/:cat/:id/edit", // Genau dieses Format [cat]/[id]/edit
  ];
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});
export const config = {
  matcher: ["/dashboard/:path*", "/projects/:cat/:id/edit"],
};
