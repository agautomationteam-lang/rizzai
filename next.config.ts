import type { NextConfig } from "next";

const isCapacitor = process.env.CAPACITOR_BUILD === "true" || process.env.CAPACITOR_BUILD === "1";

const nextConfig: NextConfig = {
  ...(isCapacitor && { output: "export", distDir: "dist" }),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
