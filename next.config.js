// /** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')()

const config = withNextIntl({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.realworld.io',
      },
    ],
  },
})

module.exports = config
