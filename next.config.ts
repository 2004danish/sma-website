// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Add your CMS domain here later, e.g., cdn.sanity.io
    ],
  },
};

export default nextConfig;