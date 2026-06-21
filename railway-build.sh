#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "====== 安装后端依赖 ======"
cd "$SCRIPT_DIR/xinwenhoutai"
npm install

echo "====== 构建后台管理前端 ======"
npm run build

echo "====== 安装并构建前台展示前端 ======"
if [ -d "$SCRIPT_DIR/frontend/xinwenqiantai" ]; then
  cd "$SCRIPT_DIR/frontend/xinwenqiantai"
  npm install
  npm run build
  echo "====== 复制前台 dist 到后端目录 ======"
  cp -r dist "$SCRIPT_DIR/xinwenhoutai/qiantai-dist"
else
  echo "⚠️  前台目录不存在"
fi

echo "====== 构建完成 ======"
echo "后台 dist 目录内容:"
ls -la "$SCRIPT_DIR/xinwenhoutai/dist/"
echo "dist/assets 文件数: $(ls "$SCRIPT_DIR/xinwenhoutai/dist/assets/" 2>/dev/null | wc -l)"
