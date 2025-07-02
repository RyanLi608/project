# LandmarkAI - 探索地标背后的故事

LandmarkAI是一个基于Next.js开发的旅游网站，通过AI生成的历史内容，帮助用户深入了解全球著名地标和旅游目的地。

[![自动部署到Vercel](https://img.shields.io/badge/自动部署-Vercel-black.svg?style=for-the-badge&logo=vercel)](https://vercel.com)

## 功能特点

- **多语言支持**: 支持中文和英文切换
- **AI生成内容**: 支持OpenAI和DeepSeek API，提供丰富的历史背景和当地洞察
- **个性化行程规划**: 根据用户偏好生成定制旅行计划
- **响应式设计**: 适配各种设备，提供流畅的用户体验

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/your-username/landmarkai.git
cd landmarkai
```

2. 安装依赖
```bash
npm install
```

3. 创建环境变量
创建一个`.env.local`文件，并设置以下变量：
```
OPENAI_API_KEY=your_openai_api_key_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

4. 启动开发服务器
```bash
npm run dev
```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## API切换

项目支持OpenAI和DeepSeek两种API。默认使用OpenAI API，如需切换到DeepSeek API，请在`lib/api/deepseek.ts`文件中修改：

```javascript
// 默认使用OpenAI API，如果设置USE_DEEPSEEK=true则使用DeepSeek API
const USE_DEEPSEEK = true; // 改为true即可使用DeepSeek API
```

## 部署

项目可以轻松部署到Vercel平台：

1. 在Vercel上导入GitHub仓库
2. 设置环境变量`OPENAI_API_KEY`和`DEEPSEEK_API_KEY`
3. 部署!

## CI/CD

项目配置了持续集成和部署：
- 每次提交到`main`分支都会自动部署到Vercel
- 使用`vercel.json`配置自动部署行为

## 技术栈

- Next.js 13
- TypeScript
- Tailwind CSS
- shadcn/ui 组件库
- OpenAI API / DeepSeek API

## 贡献

欢迎提交问题和拉取请求来改进项目。

## 许可证

MIT # 触发Vercel部署
# 强制触发 Vercel 部署 - Sat Jun 28 19:25:53 CST 2025
# Force Deploy Wed Jul  2 20:42:12 CST 2025
