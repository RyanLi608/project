# 完整登录系统设置指南

## ✅ 已完成的配置

### 1. Google OAuth ✅
- ✅ Google Client ID: 已配置
- ✅ Google Client Secret: 已配置
- ✅ NextAuth 集成: 已完成

### 2. Supabase 集成 ✅
- ✅ Supabase 配置: 已完成
- ✅ NextAuth + Supabase 集成: 已实现
- ✅ 用户数据自动保存: 已配置

## ❌ 还需要完成的配置

### 1. GitHub OAuth 设置
你还需要设置 GitHub OAuth 应用：

1. **访问 GitHub Developer Settings**
   - 访问：https://github.com/settings/developers
   - 点击 "New OAuth App"

2. **配置 OAuth 应用**
   ```
   Application name: LandmarkAI Travel Website
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:3000/api/auth/callback/github
   ```

3. **获取凭据并更新 .env.local**
   ```env
   GITHUB_ID=你的GitHub客户端ID
   GITHUB_SECRET=你的GitHub客户端密钥
   ```

### 2. Supabase 数据库表设置

1. **访问 Supabase Dashboard**
   - 访问：https://supabase.com/dashboard
   - 选择你的项目：rydtjnmcoivovxwjkubu

2. **执行 SQL 脚本**
   - 进入 "SQL Editor"
   - 复制并执行 `supabase/users-table.sql` 中的内容
   - 这将创建用户表和相关配置

### 3. Google Cloud Console 回调 URL 配置

确保在 Google Cloud Console 中添加了正确的回调 URL：
- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3001/api/auth/callback/google`
- `https://your-vercel-domain.vercel.app/api/auth/callback/google`

## 🧪 测试步骤

### 1. 测试 Google OAuth
```bash
npm run test:google-oauth
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 测试登录流程
1. 访问 http://localhost:3000
2. 点击登录按钮
3. 选择 Google 登录
4. 验证用户数据是否保存到 Supabase

## 🔧 功能特性

### 已实现的功能：
- ✅ Google OAuth 登录
- ✅ 用户数据自动保存到 Supabase
- ✅ 用户信息更新
- ✅ 安全的数据库访问策略
- ✅ 自动时间戳更新

### 待实现的功能：
- ❌ GitHub OAuth 登录（需要设置凭据）
- ❌ 用户个人资料页面
- ❌ 用户偏好设置

## 🔒 安全特性

1. **Row Level Security (RLS)**
   - 用户只能访问自己的数据
   - 服务端可以插入新用户

2. **环境变量保护**
   - 敏感信息存储在环境变量中
   - 客户端不暴露服务端密钥

3. **JWT 会话管理**
   - 安全的会话处理
   - 自动令牌刷新

## 🚀 部署到 Vercel

1. **更新 Vercel 环境变量**
   在 Vercel Dashboard 中添加：
   ```
   GOOGLE_CLIENT_ID=你的Google客户端ID
   GOOGLE_CLIENT_SECRET=你的Google客户端密钥
   GITHUB_ID=你的GitHub客户端ID
   GITHUB_SECRET=你的GitHub客户端密钥
   ```

2. **更新回调 URL**
   在 Google Cloud Console 和 GitHub OAuth 应用中添加生产环境回调 URL

## 📝 下一步

1. **设置 GitHub OAuth**（最重要）
2. **在 Supabase 中创建数据库表**
3. **测试完整的登录流程**
4. **部署到 Vercel** 