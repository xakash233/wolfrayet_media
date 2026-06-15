/** Deployed Wolfrayet API on Vercel — used when env still points at localhost. */
export const PRODUCTION_BACKEND_URL =
  "https://backend-wolf-ten.vercel.app";

const LOCALHOST_PATTERN = /localhost|127\.0\.0\.1/;

/** Resolve backend base URL (no trailing slash). */
export function resolveBackendUrl() {
  const url = (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://localhost:3001"
  )
    .trim()
    .replace(/\/$/, "");

  if (process.env.VERCEL === "1" && LOCALHOST_PATTERN.test(url)) {
    return PRODUCTION_BACKEND_URL;
  }

  return url;
}
