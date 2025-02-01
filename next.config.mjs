/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config;
  },
  experimental: {
    turbo: {
      weak: true,
    },
  },
};

export default nextConfig;
