import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Defaults to ".next" so `dev`/`build` are unchanged; an out-of-band build
  // (e.g. a verification/preview build) can set NEXT_DIST_DIR to a separate
  // folder so it never clobbers the dev server's ".next".
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
