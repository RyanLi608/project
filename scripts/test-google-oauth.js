#!/usr/bin/env node

/**
 * Google OAuth 配置测试脚本
 * 验证环境变量和基本配置是否正确
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Google OAuth 配置检查\n');

// 读取环境变量
const envPath = path.join(__dirname, '..', '.env.local');
let envContent = '';

try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
  console.error('❌ 无法读取 .env.local 文件');
  process.exit(1);
}

// 解析环境变量
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

// 检查必需的环境变量
const requiredVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET'
];

let hasErrors = false;

console.log('📋 环境变量检查:');
requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value.startsWith('your-')) {
    console.log(`❌ ${varName}: 未设置或使用占位符值`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName}: 已设置`);
  }
});

console.log('\n🔧 配置验证:');

// 验证 Google Client ID 格式
const clientId = envVars['GOOGLE_CLIENT_ID'];
if (clientId && clientId.includes('.apps.googleusercontent.com')) {
  console.log('✅ Google Client ID 格式正确');
} else {
  console.log('❌ Google Client ID 格式不正确 (应该以 .apps.googleusercontent.com 结尾)');
  hasErrors = true;
}

// 验证 Google Client Secret 格式
const clientSecret = envVars['GOOGLE_CLIENT_SECRET'];
if (clientSecret && clientSecret.startsWith('GOCSPX-')) {
  console.log('✅ Google Client Secret 格式正确');
} else {
  console.log('❌ Google Client Secret 格式不正确 (应该以 GOCSPX- 开头)');
  hasErrors = true;
}

// 验证 NextAuth URL
const nextAuthUrl = envVars['NEXTAUTH_URL'];
if (nextAuthUrl && (nextAuthUrl.startsWith('http://localhost') || nextAuthUrl.startsWith('https://'))) {
  console.log('✅ NEXTAUTH_URL 格式正确');
} else {
  console.log('❌ NEXTAUTH_URL 格式不正确');
  hasErrors = true;
}

console.log('\n📝 建议的回调 URL:');
console.log('- http://localhost:3000/api/auth/callback/google');
console.log('- http://localhost:3001/api/auth/callback/google');
console.log('- https://your-vercel-domain.vercel.app/api/auth/callback/google');

console.log('\n🔗 有用的链接:');
console.log('- Google Cloud Console: https://console.cloud.google.com/');
console.log('- API 和服务 > 凭据: https://console.cloud.google.com/apis/credentials');

if (hasErrors) {
  console.log('\n❌ 发现配置问题，请参考 README-Google-OAuth.md 进行设置');
  process.exit(1);
} else {
  console.log('\n✅ Google OAuth 配置看起来正确！');
  console.log('💡 如果仍有问题，请检查 Google Cloud Console 中的回调 URL 配置');
} 