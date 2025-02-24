/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  distDir: "dist",
  basePath: "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
