import { apiUrl } from "@/lib/api/config";

export async function postJson<T>(
  path: string,
  body: unknown
): Promise<T> {
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(
      typeof err.error === "string" ? err.error : "Request failed"
    );
  }

  return res.json() as Promise<T>;
}

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path), { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Request failed");
  }
  return res.json() as Promise<T>;
}
