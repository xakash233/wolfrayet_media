import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminToken,
  verifyAdminCredentials,
} from "@/lib/cms/auth";

export async function POST(request: Request) {
  try {
    const { userId, password } = await request.json();
    if (!userId || !password || !verifyAdminCredentials(userId, password)) {
      return NextResponse.json(
        { error: "Invalid user ID or password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, createAdminToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
