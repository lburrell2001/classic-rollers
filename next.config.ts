import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/insurance",
        destination: "https://www.texasinsurance101.com/classic-car-insurance",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
