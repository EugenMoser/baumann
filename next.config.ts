import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode to help identify potential problems in the application

  swcMinify: true, // Enable SWC for minifying JavaScript code for faster builds and better performance

  productionBrowserSourceMaps: true, // Enable source maps in production to help with debugging
};

export default nextConfig;
