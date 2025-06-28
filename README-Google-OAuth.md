# Google OAuth 设置指南

## 🔧 设置步骤

### 1. 访问 Google Cloud Console
访问 [Google Cloud Console](https://console.cloud.google.com/)

### 2. 创建或选择项目
- 如果没有项目，点击 "创建项目"
- 项目名称建议：`LandmarkAI-Travel-Website`

### 3. 启用 Google Identity API
1. 在左侧菜单中，点击 "API 和服务" > "库"
2. 搜索 "Google Identity"
3. 点击 "Google Identity" 并启用

### 4. 创建 OAuth 2.0 凭据
1. 在左侧菜单中，点击 "API 和服务" > "凭据"
2. 点击 "创建凭据" > "OAuth 2.0 客户端 ID"
3. 如果提示配置 OAuth 同意屏幕，请先完成配置：
   - 用户类型：外部
   - 应用名称：`LandmarkAI Travel Website`
   - 用户支持电子邮件：你的邮箱
   - 开发者联系信息：你的邮箱

### 5. 配置 OAuth 客户端
- **应用类型**：Web 应用
- **名称**：`LandmarkAI Travel Website`
- **授权的重定向 URI**：
  ```
  http://localhost:3000/api/auth/callback/google
  http://localhost:3001/api/auth/callback/google
  https://your-vercel-domain.vercel.app/api/auth/callback/google
  ```

### 6. 获取凭据
创建完成后，你会得到：
- **客户端 ID**：类似 `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- **客户端密钥**：类似 `GOCSPX-abcdefghijklmnopqrstuvwxyz`

### 7. 更新环境变量
将获取的凭据添加到 `.env.local` 文件：

```env
# Google OAuth 配置
GOOGLE_CLIENT_ID=你的客户端ID
GOOGLE_CLIENT_SECRET=你的客户端密钥
```

## 🧪 测试配置

运行以下命令测试 Google OAuth 配置：

```bash
npm run test:google-oauth
```

## 🚀 Vercel 部署配置

在 Vercel Dashboard 中添加环境变量：
1. 访问你的 Vercel 项目设置
2. 点击 "Environment Variables"
3. 添加：
   - `GOOGLE_CLIENT_ID` = 你的客户端ID
   - `GOOGLE_CLIENT_SECRET` = 你的客户端密钥

## ⚠️ 重要注意事项

1. **开发环境**：确保在 Google Cloud Console 中添加了 `localhost:3000` 和 `localhost:3001` 的回调 URL
2. **生产环境**：添加你的实际域名的回调 URL
3. **安全性**：永远不要在代码中硬编码客户端密钥
4. **测试用户**：在开发阶段，你可能需要添加测试用户邮箱到 OAuth 同意屏幕

## 🔍 故障排除

### 404 错误
- 检查回调 URL 是否正确配置
- 确保环境变量正确设置
- 重启开发服务器

### 403 错误
- 检查 OAuth 同意屏幕配置
- 确保用户邮箱在测试用户列表中（开发阶段）

### 其他错误
- 检查 Google Identity API 是否已启用
- 确认项目配额未超限 