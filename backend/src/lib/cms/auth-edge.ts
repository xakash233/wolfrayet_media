const ADMIN_PAYLOAD = "wolfrayet-admin";

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "wolfrayet-admin-change-me";
}

async function signToken(): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(ADMIN_PAYLOAD));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyAdminTokenEdge(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;
  try {
    const expected = await signToken();
    return token === expected;
  } catch {
    return false;
  }
}
