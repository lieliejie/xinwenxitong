#!/bin/bash
set -e

echo "====== Railway Build Start ======"
echo "PWD: $(pwd)"
echo "====== npm install ======"
npm install

echo "====== npm run build (vite) ======"
npm run build

echo "====== 检查 dist 目录 ======"
if [ -d dist ]; then
  echo "✅ dist 存在"
  ls -la dist/
  echo "dist/assets:"
  ls -la dist/assets/ 2>/dev/null || echo "assets 目录不存在!"
else
  echo "❌ dist 目录不存在! 这是严重错误!"
  exit 1
fi

echo "====== Railway Build Complete ======"
