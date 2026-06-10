import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminTokenEdge } from "@/lib/cms/auth-edge";
import { corsHeaders } from "@/lib/cors";

const ADMIN_COOKIE = "wolfrayet_admin";

const PUBLIC_API_PREFIXES = ["/api/cms/", "/api/contact", "/api/chat", "/api/newsletter"];

function isPublicApi(pathname: string): boolean {
  return PUBLIC_API_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.method === "OPTIONS" && isPublicApi(pathname)) {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const authed = await verifyAdminTokenEdge(token);
    if (!authed) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const authed = await verifyAdminTokenEdge(token);
    if (authed) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (isPublicApi(pathname)) {
    Object.entries(corsHeaders(request)).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/cms/:path*",
    "/api/contact",
    "/api/chat",
    "/api/newsletter",
  ],
};
