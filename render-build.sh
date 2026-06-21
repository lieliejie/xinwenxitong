#!/bin/bash
# Render 构建脚本：安装依赖 + 构建前端
set -e

echo "====== 安装后端依赖 ======"
cd xinwenhoutai
npm install

echo "====== 构建后台管理前端 ======"
npm run build

echo "====== 构建前台展示前端 ======"
cd ../前台展示页面/xinwenqiantai
npm install
npm run build

echo "====== 构建完成 ======"
