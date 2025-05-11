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
  images: {
    domains: ['randomuser.me', 'images.unsplash.com'],
  },
};

export default nextConfig;
