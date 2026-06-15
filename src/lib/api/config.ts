import { resolveBackendUrl } from "@/lib/api/backend-url";

/** Base URL for the Wolfrayet backend API (no trailing slash). */
export function getApiUrl(): string {
  return resolveBackendUrl();
}

/**
 * Resolve API path for fetch calls.
 * - Browser: same-origin `/api/*` → proxied to backend via next.config rewrites (no CORS).
 * - Server: direct backend URL (SSR / build-time data fetching).
 */
export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (typeof window !== "undefined") {
    return normalized;
  }

  return `${getApiUrl()}${normalized}`;
}
