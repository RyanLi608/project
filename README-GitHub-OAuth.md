# 多平台 OAuth 登录配置指南 (GitHub + Google)

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

## 3. 配置环境变量

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
```

### 获取凭据：

**GitHub 凭据：**
- **GITHUB_ID**: 在 GitHub OAuth 应用页面的 "Client ID"
- **GITHUB_SECRET**: 在 GitHub OAuth 应用页面的 "Client Secret"

**Google 凭据：**
- **GOOGLE_CLIENT_ID**: 在 Google Cloud Console 凭据页面的客户端 ID
- **GOOGLE_CLIENT_SECRET**: 在 Google Cloud Console 凭据页面的客户端密钥

### 生成 NextAuth Secret：
```bash
openssl rand -base64 32
```

## 4. 生产环境配置

对于 Vercel 部署：
1. 在 Vercel 项目设置中添加所有环境变量
2. 更新 GitHub OAuth 应用的回调 URL 为生产域名
3. 更新 Google OAuth 应用的回调 URL 为生产域名
4. 设置 `NEXTAUTH_URL` 为生产域名

## 5. 功能特性

- ✅ 多平台 OAuth 登录 (GitHub + Google)
- ✅ 下拉菜单选择登录方式
- ✅ 用户会话管理
- ✅ 自动登录/登出状态
- ✅ 用户头像和信息显示
- ✅ 响应式设计支持
- ✅ 多语言支持
- ✅ 点击外部关闭菜单

## 6. 使用方法

用户点击 "登录" 按钮后：
1. 显示下拉菜单，包含 GitHub 和 Google 选项
2. 选择登录方式后重定向到对应的授权页面
3. 用户授权后返回网站
4. 自动创建会话并显示用户信息
5. 点击退出按钮可登出

## 7. 安全注意事项

- 确保 `.env.local` 文件不被提交到版本控制
- 在生产环境中使用强随机的 `NEXTAUTH_SECRET`
- 定期轮换 GitHub 和 Google OAuth 密钥
- 设置正确的回调 URL 以防止安全漏洞
- 在 Google Cloud Console 中限制 API 密钥的使用范围 