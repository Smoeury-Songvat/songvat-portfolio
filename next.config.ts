import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows images from any domain
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
