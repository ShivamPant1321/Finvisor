/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add polyfills or additional webpack configurations here if needed
    return config;
  },
  experimental: {
    turbo: {
      weak: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
