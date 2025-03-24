/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'une-momes-photos.s3.eu-west-3.amazonaws.com',
        pathname: '/**',
      }
    ],
    unoptimized: false,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'quill$': 'quill/dist/quill.js',
    }
    return config
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '16mb'
    }
  }
}

module.exports = nextConfig 