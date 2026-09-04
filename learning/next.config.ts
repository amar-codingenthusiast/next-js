import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // minimizes rendering part of the page that is not changed, making the page load faster with babel-plugin-react-compiler
  cacheComponents: true, // caches the components to make the page load faster
  experimental: {
    turbopackFileSystemCacheForDev: true, // rebuild during dev is faster
  },
};

export default nextConfig;
