# 项目配置指南 (OAuth登录 + Supabase数据库)

## 1. 创建 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: LandmarkAI
   - **Homepage URL**: `http://localhost:3000` (开发环境) 或 `https://your-domain.com` (生产环境)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github` (开发环境) 或 `https://your-domain.com/api/auth/callback/github` (生产环境)

## 2. 创建 Google OAuth 应用

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 转到 "凭据" > "创建凭据" > "OAuth 2.0 客户端 ID"
5. 设置应用类型为 "Web 应用"
6. 添加授权重定向 URI：
   - 开发环境：`http://localhost:3000/api/auth/callback/google`
   - 生产环境：`https://your-domain.com/api/auth/callback/google`

## 3. Supabase 数据库配置

Supabase 配置已经预设完成，包含以下信息：
- **项目 URL**: https://rydtjnmcoivovxwjkubu.supabase.co
- **匿名公钥**: 已配置
- **服务角色密钥**: 已配置

## 4. 配置环境变量

创建 `.env.local` 文件并添加以下变量：

```env
# NextAuth 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# GitHub OAuth 配置
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Google OAuth 配置
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase 配置 (已预设)
NEXT_PUBLIC_SUPABASE_URL=https://rydtjnmcoivovxwjkubu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZHRqbm1jb2l2b3Z4d2prdWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwODM5MzgsImV4cCI6MjA2NjY1OTkzOH0.bZfAUhfnw8u8L6OmgGSOqGQLhJGud0MJyoFe46qHr6w
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZHRqbm1jb2l2b3Z4d2prdWJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTA4MzkzOCwiZXhwIjoyMDY2NjU5OTM4fQ.hfqvtJk44RmqA5NKxTGxikW7Eas0Ga3zU46hmDvNblY
```

### 获取凭据：

**GitHub 凭据：**
- **GITHUB_ID**: 在 GitHub OAuth 应用页面的 "Client ID"
- **GITHUB_SECRET**: 在 GitHub OAuth 应用页面的 "Client Secret"

**Google 凭据：**
- **GOOGLE_CLIENT_ID**: 在 Google Cloud Console 凭据页面的客户端 ID
- **GOOGLE_CLIENT_SECRET**: 在 Google Cloud Console 凭据页面的客户端密钥

**Supabase 凭据：**
- **NEXT_PUBLIC_SUPABASE_URL**: Supabase 项目 URL (已预设)
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: 匿名公钥 (已预设)
- **SUPABASE_SERVICE_ROLE_KEY**: 服务角色密钥 (已预设)

### 生成 NextAuth Secret：
```bash
openssl rand -base64 32
```

## 5. 生产环境配置

对于 Vercel 部署：
1. 在 Vercel 项目设置中添加所有环境变量
2. 更新 GitHub OAuth 应用的回调 URL 为生产域名
3. 更新 Google OAuth 应用的回调 URL 为生产域名
4. 设置 `NEXTAUTH_URL` 为生产域名
5. Supabase 配置无需修改，可直接使用

## 6. 功能特性

**OAuth 登录：**
- ✅ 多平台 OAuth 登录 (GitHub + Google)
- ✅ 下拉菜单选择登录方式
- ✅ 用户会话管理
- ✅ 自动登录/登出状态
- ✅ 用户头像和信息显示
- ✅ 响应式设计支持
- ✅ 多语言支持
- ✅ 点击外部关闭菜单

**Supabase 数据库：**
- ✅ 客户端和服务端 Supabase 客户端
- ✅ 实时数据库连接
- ✅ 行级安全 (RLS) 支持
- ✅ API 路由示例
- ✅ 前端组件示例

## 7. 使用方法

**OAuth 登录流程：**
1. 用户点击 "登录" 按钮
2. 显示下拉菜单，包含 GitHub 和 Google 选项
3. 选择登录方式后重定向到对应的授权页面
4. 用户授权后返回网站
5. 自动创建会话并显示用户信息
6. 点击退出按钮可登出

**Supabase 使用示例：**
1. 客户端：`import { supabase } from '@/lib/supabase'`
2. 服务端：`import { createServerSupabaseClient } from '@/lib/supabase'`
3. API 测试：访问 `/api/supabase-test` 测试连接
4. 组件示例：使用 `SupabaseExample` 组件测试功能

## 8. 安全注意事项

- 确保 `.env.local` 文件不被提交到版本控制
- 在生产环境中使用强随机的 `NEXTAUTH_SECRET`
- 定期轮换 GitHub 和 Google OAuth 密钥
- 设置正确的回调 URL 以防止安全漏洞
- 在 Google Cloud Console 中限制 API 密钥的使用范围
- Supabase 服务角色密钥仅在服务端使用，切勿暴露给客户端
- 在 Supabase 中配置行级安全 (RLS) 策略保护数据 