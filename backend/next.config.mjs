/** @type {import('next').NextConfig} */
function getAssetPrefix() {
  if (process.env.NODE_ENV !== "production") return undefined;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (siteUrl) return siteUrl;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
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
      allowedOrigins: (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000")
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean),
    },
  },
};

export default nextConfig;
