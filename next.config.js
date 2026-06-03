/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
};

module.exports = withPWA(nextConfig);
