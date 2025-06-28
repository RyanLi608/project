#!/bin/bash

echo "🚀 设置项目环境变量..."

# 检查是否存在 .env.local 文件
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local 文件已存在"
    read -p "是否要覆盖现有文件? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 取消操作"
        exit 1
    fi
fi

# 复制模板文件
cp env-example.txt .env.local

echo "✅ 环境变量文件已创建: .env.local"
echo ""
echo "📝 接下来需要配置以下 OAuth 凭据:"
echo "   1. GitHub OAuth App: https://github.com/settings/developers"
echo "   2. Google OAuth App: https://console.cloud.google.com/"
echo ""
echo "🔧 Supabase 配置已预设完成，可直接使用"
echo ""
echo "🎯 配置完成后运行: npm run dev" 