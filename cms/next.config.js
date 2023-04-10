/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COOKBOOK_URL: process.env.COOKBOOK_URL,
  },
}

module.exports = nextConfig
