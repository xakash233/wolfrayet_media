import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "wolfrayet_admin";
const ADMIN_PAYLOAD = "wolfrayet-admin";

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "wolfrayet-admin-change-me";
}

export function createAdminToken(): string {
  return createHmac("sha256", getSecret()).update(ADMIN_PAYLOAD).digest("hex");
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const expected = Buffer.from(createAdminToken());
    const received = Buffer.from(token);
    if (expected.length !== received.length) return false;
    return timingSafeEqual(expected, received);
  } catch {
    return false;
  }
}

function safeCompare(value: string, expected: string): boolean {
  try {
    const a = Buffer.from(value);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminCredentials(userId: string, password: string): boolean {
  const expectedUserId = (process.env.ADMIN_USER_ID ?? "admin").trim();
  const expectedPassword = (
    process.env.ADMIN_PASSWORD ?? "wolfrayet-admin-change-me"
  ).trim();
  return (
    safeCompare(userId.trim(), expectedUserId) &&
    safeCompare(password.trim(), expectedPassword)
  );
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

export function unauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
