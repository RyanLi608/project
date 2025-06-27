/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@floating-ui/react-dom'],
  },
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['randomuser.me', 'images.pexels.com'],
  },
  output: 'standalone',
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_API_URL: process.env.OPENAI_API_URL,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    DEEPSEEK_API_URL: process.env.DEEPSEEK_API_URL,
    DEEPSEEK_MODEL: process.env.DEEPSEEK_MODEL,
    USE_DEEPSEEK: process.env.USE_DEEPSEEK,
  },
};

module.exports = nextConfig;
