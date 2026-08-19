import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: "cdn-images-1.medium.com",
        protocol: "https",
      },
      {
        hostname: "miro.medium.com",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
