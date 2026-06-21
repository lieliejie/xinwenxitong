#!/bin/bash
set -e

echo "====== 安装后端依赖 ======"
npm install

echo "====== 构建后台管理前端 ======"
npm run build

echo "====== 安装并构建前台展示前端 ======"
cd ../frontend/xinwenqiantai
npm install
npm run build

echo "====== 复制前台 dist 到后端目录 ======"
cp -r dist ../../xinwenhoutai/qiantai-dist

echo "====== 构建完成 ======"
ls -la ../../xinwenhoutai/
