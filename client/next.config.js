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
  }
}

module.exports = nextConfig