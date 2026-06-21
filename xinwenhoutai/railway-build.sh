#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "====== SCRIPT_DIR=$SCRIPT_DIR ======"

echo "====== 安装后端依赖 ======"
cd "$SCRIPT_DIR"
npm install

echo "====== 构建后台管理前端 ======"
npm run build

echo "====== 后台 dist 目录检查 ======"
ls -la dist/ 2>/dev/null || echo "❌ dist 目录不存在!"
ls -la dist/assets/ 2>/dev/null || echo "❌ dist/assets 目录不存在!"
echo "dist/assets 文件数: $(ls dist/assets/ 2>/dev/null | wc -l)"

# 前台构建：失败不影响整体（前台可能不存在）
echo "====== 安装并构建前台展示前端 ======"
QIANTAI_DIR="$SCRIPT_DIR/../frontend/xinwenqiantai"
if [ -d "$QIANTAI_DIR" ]; then
  cd "$QIANTAI_DIR"
  npm install || echo "⚠️ 前台 npm install 失败，跳过"
  npm run build || echo "⚠️ 前台 npm run build 失败，跳过"
  if [ -d dist ]; then
    echo "====== 复制前台 dist 到后端目录 ======"
    cp -r dist "$SCRIPT_DIR/qiantai-dist"
    echo "✅ 前台复制完成"
  fi
else
  echo "⚠️  前台目录不存在: $QIANTAI_DIR，跳过前台构建"
fi

echo "====== 最终构建结果 ======"
echo "当前目录: $(pwd)"
echo "后台 dist 存在: $([ -d "$SCRIPT_DIR/dist" ] && echo YES || echo NO)"
echo "前台 qiantai-dist 存在: $([ -d "$SCRIPT_DIR/qiantai-dist" ] && echo YES || echo NO)"
