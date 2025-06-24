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
  // 添加环境变量配置
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
