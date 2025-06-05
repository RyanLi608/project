#!/bin/bash

# 颜色设置
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 当前时间
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# 显示提示信息
echo -e "${GREEN}===== 开始自动部署 (${TIMESTAMP}) =====${NC}"

# 进入项目目录
cd "$(dirname "$0")"

# 1. 添加所有更改到git
echo -e "${YELLOW}1. 添加更改到Git...${NC}"
git add .

# 2. 提交更改
echo -e "${YELLOW}2. 提交更改到Git...${NC}"
git commit -m "自动部署更新: $TIMESTAMP"

# 3. 推送到GitHub
echo -e "${YELLOW}3. 推送到GitHub...${NC}"
git push origin main
PUSH_STATUS=$?

# 检查推送状态
if [ $PUSH_STATUS -ne 0 ]; then
  echo -e "${YELLOW}GitHub推送失败，尝试直接部署到Vercel...${NC}"
else
  echo -e "${GREEN}GitHub推送成功!${NC}"
fi

# 4. 构建项目
echo -e "${YELLOW}4. 构建项目...${NC}"
npm run build

# 5. 部署到Vercel
echo -e "${YELLOW}5. 部署到Vercel...${NC}"
npx vercel deploy --prod -y

echo -e "${GREEN}===== 部署完成! =====${NC}"
echo -e "${GREEN}项目已自动部署到GitHub和Vercel${NC}" 