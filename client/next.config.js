/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: false,
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
  // Production optimizations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Increase performance
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig