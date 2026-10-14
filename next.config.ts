import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Always inline the QA flag (empty unless set) so the QA hook in smooth-scroll.tsx is
  // removed as dead code from normal builds instead of being read at runtime.
  env: { NEXT_PUBLIC_QA_HOOKS: process.env.NEXT_PUBLIC_QA_HOOKS ?? "" },
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    root: projectRoot,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
