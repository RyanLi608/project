/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.pexels.com'],
    // 只在导出静态网站时需要unoptimized: true
    // unoptimized: true,
  },
};

module.exports = nextConfig;
