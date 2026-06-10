/** Base URL for the Wolfrayet backend API (no trailing slash). */
export function getApiUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.API_URL?.trim() ||
    "http://localhost:3001";
  return url.replace(/\/$/, "");
}

/**
 * Resolve API path for fetch calls.
 * - Browser (dev): same-origin `/api/*` → proxied to backend via next.config rewrites (no CORS).
 * - Server (dev) & production: direct backend URL.
 */
export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    return normalized;
  }

  return `${getApiUrl()}${normalized}`;
}
