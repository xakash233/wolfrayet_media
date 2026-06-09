import { cookies } from "next/headers";
import { ADMIN_COOKIE, unauthorizedResponse, verifyAdminToken } from "@/lib/cms/auth";

export async function requireAdminApi(): Promise<Response | null> {
  const cookieStore = await cookies();
  if (!verifyAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return unauthorizedResponse();
  }
  return null;
}
