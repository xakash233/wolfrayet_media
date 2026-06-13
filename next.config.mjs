/** @type {import('next').NextConfig} */
function resolveBackendUrl() {
  const url = (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001"
  ).replace(/\/$/, "");

  if (process.env.VERCEL === "1" && /localhost|127\.0\.0\.1/.test(url)) {
    throw new Error(
      "Set NEXT_PUBLIC_API_URL (or BACKEND_URL) to your public backend URL on Vercel, e.g. https://backend-wolf-ten.vercel.app — localhost rewrites fail with DNS_HOSTNAME_RESOLVED_PRIVATE."
    );
  }

  return url;
}

const backendUrl = resolveBackendUrl();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/admin",
        destination: `${backendUrl}/admin`,
      },
      {
        source: "/admin/:path*",
        destination: `${backendUrl}/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
