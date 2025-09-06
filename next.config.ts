import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
    // fallback for domains not matched by remotePatterns
    unoptimized: false,
  },
};

export default nextConfig;
