@echo off
chcp 65001 >nul
title 新闻管理系统 - 一键启动

echo ========================================
echo    新闻管理系统 - 一键部署启动
echo ========================================
echo.

:: 检查 Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未找到 Node.js，请先安装 Node.js！
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)

:: 获取脚本所在目录（项目根目录）
set "PROJECT_DIR=%~dp0"

echo [1/4] 检查依赖...

:: 安装根目录依赖
cd /d "%PROJECT_DIR%"
if exist "package.json" (
    if not exist "node_modules" (
        echo   安装根目录依赖...
        call npm install
    ) else (
        echo   根目录依赖已存在，跳过
    )
)

:: 安装 xinwenhoutai 依赖
cd /d "%PROJECT_DIR%xinwenhoutai"
if exist "package.json" (
    if not exist "node_modules" (
        echo   安装后端/后台管理依赖...
        call npm install
    ) else (
        echo   后端依赖已存在，跳过
    )
)

:: 安装 xinwenqiantai 依赖
cd /d "%PROJECT_DIR%前台展示页面\xinwenqiantai"
if exist "package.json" (
    if not exist "node_modules" (
        echo   安装前台展示依赖...
        call npm install
    ) else (
        echo   前台依赖已存在，跳过
    )
)

echo.
echo [2/4] 构建前端...

:: 构建后台管理前端
cd /d "%PROJECT_DIR%xinwenhoutai"
echo   构建后台管理前端...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 后台管理前端构建失败！
    pause
    exit /b 1
)

:: 构建前台展示前端
cd /d "%PROJECT_DIR%前台展示页面\xinwenqiantai"
echo   构建前台展示前端...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 前台展示前端构建失败！
    pause
    exit /b 1
)

echo.
echo [3/4] 检查 PM2...

:: 检查 PM2 是否已全局安装
where pm2 >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo   安装 PM2（进程管理工具）...
    call npm install -g pm2
    if %ERRORLEVEL% NEQ 0 (
        echo [错误] PM2 安装失败！
        pause
        exit /b 1
    )
) else (
    echo   PM2 已安装，跳过
)

echo.
echo [4/4] 启动服务...

:: 先停掉旧的同名进程（如果存在）
cd /d "%PROJECT_DIR%xinwenhoutai"
pm2 delete xinwen-fuwu 2>nul

:: 启动服务
pm2 start ecosystem.config.json

:: 保存 PM2 进程列表（用于开机自启）
pm2 save

:: 设置 PM2 开机自启动
echo   配置开机自启动...
pm2 startup | findstr /C:"copy" > "%TEMP%\pm2_startup_cmd.txt"
set /p PM2_CMD=<"%TEMP%\pm2_startup_cmd.txt"
if defined PM2_CMD (
    %PM2_CMD%
)

echo.
echo ========================================
echo    部署完成！
echo.
echo    前台展示: http://localhost:3000/qiantai
echo    后台管理: http://localhost:3000/houtai
echo.
echo    常用命令：
echo    - 查看状态: pm2 status
echo    - 查看日志: pm2 logs xinwen-fuwu
echo    - 重启服务: pm2 restart xinwen-fuwu
echo    - 停止服务: pm2 stop xinwen-fuwu
echo ========================================
echo.
echo 按任意键退出...
pause >nul
