# 部署到 GitHub + Render（免费公网访问）

## 整体方案

| 部分 | 部署到 | 费用 |
|------|--------|------|
| 后端 + 两个前端 | Render.com | 免费 |
| 代码托管 | GitHub | 免费 |

一个 Render 服务同时跑 API + 托管两个前端静态文件，面试官通过公网链接直接访问。

---

## 准备工作（10分钟）

### 1. 注册 GitHub 账号
打开 https://github.com → 点 Sign up → 注册一个账号

### 2. 下载安装 Git
打开 https://git-scm.com/download/win → 下载安装（一路点 Next 就行）

### 3. 注册 Render 账号
打开 https://render.com → 点 Get Started → 用 GitHub 账号登录授权

---

## 部署步骤

### 第1步：在 GitHub 创建仓库

1. 打开 https://github.com → 登录 → 点右上角 + 号 → New repository
2. Repository name 填：`xinwenxitong`（随便起）
3. 选 Public（公开）
4. **不要勾选** Add a README file
5. 点 Create repository
6. 创建后会跳到一个页面，**先别关**，等下要用

### 第2步：推送代码到 GitHub

1. 打开 PowerShell（Win+R 输入 powershell 回车）
2. 依次执行以下命令（一行一行复制粘贴）：

```powershell
cd "d:\12456789\前后联调"

git init

git add .

git commit -m "首次提交"
```

3. 然后执行下面三条（把 `你的用户名` 换成你的 GitHub 用户名）：

```powershell
git remote add origin https://github.com/你的用户名/xinwenxitong.git

git branch -M main

git push -u origin main
```

4. 会弹出一个窗口让你登录 GitHub，点授权即可

### 第3步：在 Render 部署

1. 打开 https://dashboard.render.com → 点 **New +** → 选 **Web Service**
2. 点 **Connect account** 连接你的 GitHub
3. 选择仓库 `xinwenxitong`
4. 填写配置：

| 配置项 | 值 |
|--------|-----|
| Name | xinwen-fuwu（随便） |
| Region | Singapore (新加坡，国内访问最快) |
| Branch | main |
| Root Directory | xinwenhoutai |
| Runtime | Node |
| Build Command | `npm install && npm run build && cd ../前台展示页面/xinwenqiantai && npm install && npm run build` |
| Start Command | `node houduanfangfa.cjs` |
| Instance Type | Free |

5. 点 **Create Web Service**
6. 等 3-5 分钟，部署完成后会显示一个链接，类似：
   ```
   https://xinwen-fuwu.onrender.com
   ```

### 第4步：访问

部署完成后：

| 页面 | 地址 |
|------|------|
| 前台展示 | `https://你的服务名.onrender.com/qiantai` |
| 后台管理 | `https://你的服务名.onrender.com/houtai` |

默认账号：admin / 123

把这个链接发给面试官就行了！

---

## 注意事项

- Render 免费版 **15分钟无访问会自动休眠**，下次访问需要等 30-60 秒唤醒
- 数据存储在 `dbs.json`，免费版 Render 重启后数据不会丢失
- 上传的图片会存在 Render 的磁盘上，免费版会定期清理
- 如果需要长期稳定运行，建议买一个便宜的云服务器（阿里云学生机一年 100 块左右）
