import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid picking a parent lockfile as workspace root (e.g. when repo root has another package-lock.json).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
