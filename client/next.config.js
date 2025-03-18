/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      }
    ],
    unoptimized: true, // Pour les images SVG locales
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'quill$': 'quill/dist/quill.js',
    }
    return config
  },
}

module.exports = nextConfig 