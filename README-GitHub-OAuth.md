# GitHub OAuth 配置指南

## 1. 创建 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: LandmarkAI
   - **Homepage URL**: `http://localhost:3000` (开发环境) 或 `https://your-domain.com` (生产环境)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github` (开发环境) 或 `https://your-domain.com/api/auth/callback/github` (生产环境)

## 2. 配置环境变量

创建 `.env.local` 文件并添加以下变量：

```env
# NextAuth 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# GitHub OAuth 配置
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### 获取 GitHub 凭据：
- **GITHUB_ID**: 在 GitHub OAuth 应用页面的 "Client ID"
- **GITHUB_SECRET**: 在 GitHub OAuth 应用页面的 "Client Secret"

### 生成 NextAuth Secret：
```bash
openssl rand -base64 32
```

## 3. 生产环境配置

对于 Vercel 部署：
1. 在 Vercel 项目设置中添加环境变量
2. 更新 GitHub OAuth 应用的回调 URL 为生产域名
3. 设置 `NEXTAUTH_URL` 为生产域名

## 4. 功能特性

- ✅ GitHub OAuth 登录
- ✅ 用户会话管理
- ✅ 自动登录/登出状态
- ✅ 用户头像和信息显示
- ✅ 响应式设计支持
- ✅ 多语言支持

## 5. 使用方法

用户点击 "Login with GitHub" 按钮后：
1. 重定向到 GitHub 授权页面
2. 用户授权后返回网站
3. 自动创建会话并显示用户信息
4. 点击退出按钮可登出

## 6. 安全注意事项

- 确保 `.env.local` 文件不被提交到版本控制
- 在生产环境中使用强随机的 `NEXTAUTH_SECRET`
- 定期轮换 GitHub OAuth 密钥
- 设置正确的回调 URL 以防止安全漏洞 