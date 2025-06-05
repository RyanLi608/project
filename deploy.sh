#!/bin/bash

# 颜色设置
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 当前时间
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# 显示提示信息
echo -e "${GREEN}===== 开始自动部署 (${TIMESTAMP}) =====${NC}"

# 进入项目目录
cd "$(dirname "$0")"

# 检查远程仓库状态
echo -e "${YELLOW}检查远程仓库连接...${NC}"
git remote -v
REMOTE_STATUS=$?

if [ $REMOTE_STATUS -ne 0 ]; then
  echo -e "${RED}远程仓库配置有问题，请检查${NC}"
  # 尝试重新配置远程仓库
  echo -e "${YELLOW}尝试重新配置远程仓库...${NC}"
  # 使用原有的URL重新配置
  REMOTE_URL=$(git config --get remote.origin.url)
  if [ -n "$REMOTE_URL" ]; then
    git remote remove origin
    git remote add origin $REMOTE_URL
    echo -e "${GREEN}已重新配置远程仓库: $REMOTE_URL${NC}"
  else
    echo -e "${RED}无法获取远程仓库URL，请手动配置${NC}"
    exit 1
  fi
fi

# 1. 添加所有更改到git
echo -e "${YELLOW}1. 添加更改到Git...${NC}"
git add .

# 2. 提交更改
echo -e "${YELLOW}2. 提交更改到Git...${NC}"
git commit -m "自动部署更新: $TIMESTAMP"

# 3. 推送到GitHub (增加重试机制)
echo -e "${YELLOW}3. 推送到GitHub...${NC}"
MAX_RETRIES=3
RETRY_COUNT=0
PUSH_SUCCESS=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ] && [ "$PUSH_SUCCESS" = false ]; do
  git push origin main
  PUSH_STATUS=$?
  
  if [ $PUSH_STATUS -eq 0 ]; then
    PUSH_SUCCESS=true
    echo -e "${GREEN}GitHub推送成功!${NC}"
  else
    RETRY_COUNT=$((RETRY_COUNT+1))
    if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
      echo -e "${YELLOW}推送失败，第 $RETRY_COUNT 次重试...${NC}"
      sleep 2
    fi
  fi
done

# 检查推送状态
if [ "$PUSH_SUCCESS" = false ]; then
  echo -e "${YELLOW}GitHub推送失败 $MAX_RETRIES 次，继续尝试Vercel部署...${NC}"
fi

# 4. 构建项目
echo -e "${YELLOW}4. 构建项目...${NC}"
npm run build

# 5. 部署到Vercel
echo -e "${YELLOW}5. 部署到Vercel...${NC}"
npx vercel deploy --prod -y

echo -e "${GREEN}===== 部署完成! =====${NC}"
echo -e "${GREEN}项目已自动部署${NC}" 