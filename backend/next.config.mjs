/** @type {import('next').NextConfig} */

/** Stable public backend URL — never use VERCEL_URL (preview deploys are SSO-protected). */
const PRODUCTION_BACKEND_URL = "https://backend-wolf-ten.vercel.app";

function getAssetPrefix() {
  if (process.env.NODE_ENV !== "production") return undefined;

  const stable = (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    PRODUCTION_BACKEND_URL
  )
    .trim()
    .replace(/\/$/, "");

  if (process.env.VERCEL === "1") {
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
        hostname: "*.public.blob.vercel-storage.com",
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
