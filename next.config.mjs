/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  distDir: "dist",
  basePath: "",
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/Order/:path*",
        destination: "https://r1137465.website.cgtul6dky.service.one/Order/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
