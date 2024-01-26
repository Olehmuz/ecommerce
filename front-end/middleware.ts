import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
      return NextResponse.redirect(
        new URL("/error", req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      }
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/cabinet"],
};