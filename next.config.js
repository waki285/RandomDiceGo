/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
  },
};
const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  ...nextConfig
}