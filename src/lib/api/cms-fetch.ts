import { resolveBackendUrl } from "../../../backend-url.mjs";

const CMS_FETCH_TIMEOUT_MS = 4000;

/** Fetch CMS JSON from the backend with timeout — returns fallback when offline. */
export async function fetchBackendCmsJson<T>(
  path: string,
  fallback: T
): Promise<T> {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = `${resolveBackendUrl()}${normalized}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(CMS_FETCH_TIMEOUT_MS),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}
