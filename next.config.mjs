/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  distDir: "dist",
  basePath: isProd ? "/aither-promo-page" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
