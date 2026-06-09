import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const ADMIN_COOKIE = "wolfrayet_admin";
import { verifyAdminTokenEdge } from "@/lib/cms/auth-edge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const authed = await verifyAdminTokenEdge(token);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!authed) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/admin/login" && authed) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
