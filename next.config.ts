import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Development only: lets the dev server be opened through an ngrok tunnel. Without it Next.js
  // blocks the tunnel's dev connection, the page never becomes interactive and content stays hidden.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app", "*.ngrok.io"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  compress: true,
};

export default nextConfig;
