/** @type {import('next').NextConfig} */

/** Stable public backend URL — never use VERCEL_URL (preview deploys are SSO-protected). */
const PRODUCTION_BACKEND_URL = "https://backend-wolf-ten.vercel.app";

function getAssetPrefix() {
  const stable = (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    PRODUCTION_BACKEND_URL
  )
    .trim()
    .replace(/\/$/, "");

  // Dev: admin is proxied via localhost:3000/admin — assets must load from :3001.
  if (process.env.NODE_ENV === "development") {
    return process.env.BACKEND_ASSET_PREFIX?.trim() || "http://localhost:3001";
  }

  if (process.env.NODE_ENV === "production" && process.env.VERCEL === "1") {
    return stable;
  }

  return undefined;
}

const nextConfig = {
  assetPrefix: getAssetPrefix(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: (process.env.ALLOWED_ORIGINS ??
        "http://localhost:3000,https://wolfrayetmedia.in,https://www.wolfrayetmedia.in")
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean),
    },
  },
};

export default nextConfig;
