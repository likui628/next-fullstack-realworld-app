/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['api.realworld.io'],
  },
}

module.exports = nextConfig
