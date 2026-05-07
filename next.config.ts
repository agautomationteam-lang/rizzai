import type { NextConfig } from "next";

const isCapacitor = process.env.CAPACITOR_BUILD === "1";

const nextConfig: NextConfig = {
  ...(isCapacitor && { output: "export", distDir: "dist" }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
