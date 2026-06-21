#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "====== SCRIPT_DIR=$SCRIPT_DIR ======"
echo "====== PROJECT_ROOT=$PROJECT_ROOT ======"

echo "====== 安装后端依赖 ======"
cd "$SCRIPT_DIR"
npm install

echo "====== 构建后台管理前端 ======"
npm run build

echo "====== 安装并构建前台展示前端 ======"
if [ -d "$PROJECT_ROOT/frontend/xinwenqiantai" ]; then
  cd "$PROJECT_ROOT/frontend/xinwenqiantai"
  npm install
  npm run build
  echo "====== 复制前台 dist 到后端目录 ======"
  cp -r dist "$SCRIPT_DIR/qiantai-dist"
else
  echo "⚠️  前台目录不存在: $PROJECT_ROOT/frontend/xinwenqiantai"
fi

echo "====== 构建完成 ======"
echo "当前目录: $(pwd)"
echo "后台 dist 目录内容:"
ls -la "$SCRIPT_DIR/dist/" 2>/dev/null || echo "dist 目录不存在!"
echo "dist/assets 文件数: $(ls "$SCRIPT_DIR/dist/assets/" 2>/dev/null | wc -l)"
