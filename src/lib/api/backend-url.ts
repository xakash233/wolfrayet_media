import { PRODUCTION_BACKEND_URL, resolveBackendUrl } from "../../../backend-url.mjs";

export { PRODUCTION_BACKEND_URL, resolveBackendUrl };

/** @deprecated Import from backend-url.mjs via this re-export. */
export function getResolvedBackendUrl(): string {
  return resolveBackendUrl();
}
