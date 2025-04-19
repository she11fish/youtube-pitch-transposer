import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: "standalone",
  watchOptions: {
    pollIntervalMs: 1000,
  },
};

export default nextConfig;
