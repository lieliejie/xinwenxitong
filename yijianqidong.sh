#!/bin/bash
# 新闻管理系统 - 一键部署启动脚本 (Linux/Mac)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "========================================"
echo "   新闻管理系统 - 一键部署启动"
echo "========================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "[错误] 未找到 Node.js，请先安装！"
    exit 1
fi

echo "[1/4] 安装依赖..."

# 根目录
cd "$SCRIPT_DIR"
if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
    echo "  安装根目录依赖..."
    npm install
fi

# xinwenhoutai
cd "$SCRIPT_DIR/xinwenhoutai"
if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
    echo "  安装后端依赖..."
    npm install
fi

# xinwenqiantai
cd "$SCRIPT_DIR/前台展示页面/xinwenqiantai"
if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
    echo "  安装前台依赖..."
    npm install
fi

echo ""
echo "[2/4] 构建前端..."

# 构建后台管理
cd "$SCRIPT_DIR/xinwenhoutai"
echo "  构建后台管理..."
npm run build

# 构建前台展示
cd "$SCRIPT_DIR/前台展示页面/xinwenqiantai"
echo "  构建前台展示..."
npm run build

echo ""
echo "[3/4] 安装 PM2..."

if ! command -v pm2 &> /dev/null; then
    echo "  安装 PM2..."
    npm install -g pm2
fi

echo ""
echo "[4/4] 启动服务..."

cd "$SCRIPT_DIR/xinwenhoutai"
pm2 delete xinwen-fuwu 2>/dev/null || true
pm2 start ecosystem.config.json
pm2 save

# 配置开机自启
pm2 startup

echo ""
echo "========================================"
echo "   部署完成！"
echo ""
echo "   前台展示: http://localhost:3000/qiantai"
echo "   后台管理: http://localhost:3000/houtai"
echo ""
echo "   常用命令："
echo "   - pm2 status            查看状态"
echo "   - pm2 logs xinwen-fuwu  查看日志"
echo "   - pm2 restart xinwen-fuwu  重启"
echo "   - pm2 stop xinwen-fuwu  停止"
echo "========================================"
