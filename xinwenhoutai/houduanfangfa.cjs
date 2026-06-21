const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')

const server = jsonServer.create()

// 兼容 Railway：从根目录运行时，__dirname 指向 xinwenhoutai/
const dbsPath = path.join(__dirname, 'dbs.json')
const router = jsonServer.router(dbsPath)

// 监听 dbs.json 文件变化，自动重新加载数据
fs.watchFile(dbsPath, () => {
  console.log('📂 dbs.json 文件已变更，正在重新加载数据...')
  router.db.read()
  console.log('✅ 数据已刷新')
})

const middlewares = jsonServer.defaults()
server.use(middlewares)
server.use(jsonServer.bodyParser)

// 创建上传目录
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

// 静态文件托管：http://localhost:3000/uploads/xxx.jpg 就能访问图片
server.use('/uploads', (req, res, next) => {
  next()
})
server.use('/uploads', require('express').static(uploadDir))

// ================= 托管后台管理前端 (构建后的 dist 目录) =================
const houtaiDist = path.join(__dirname, 'dist')
if (fs.existsSync(houtaiDist)) {
  const assetsDir = path.join(houtaiDist, 'assets')
  const assetsCount = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir).length : 0
  console.log('✅ 后台 dist 目录存在，assets 文件数: ' + assetsCount)

  // 先注册静态文件中间件
  server.use('/houtai', require('express').static(houtaiDist, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      } else if (filePath.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
      }
    }
  }))

  // SPA fallback：只有请求路径对应不到静态文件时才返回 index.html
  server.use('/houtai', (req, res, next) => {
    // 排除 assets 和明确的静态文件请求（它们由 express.static 处理，不存在就 404）
    const reqPath = req.path.replace(/^\/houtai/, '') || '/'
    // 如果是 assets 目录下的文件，express.static 找不到就让它 404，不要 fallback
    if (reqPath.startsWith('/assets/')) {
      // express.static 没处理说明文件不存在，返回 404
      return res.status(404).send('Not Found')
    }
    // 其他路径（SPA 路由），返回 index.html
    const indexPath = path.join(houtaiDist, 'index.html')
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath)
    } else {
      next()
    }
  })
}

// ================= 托管前台展示前端 =================
const qiantaiDist = path.join(__dirname, 'qiantai-dist')
if (fs.existsSync(qiantaiDist)) {
  server.use('/qiantai', require('express').static(qiantaiDist, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      } else if (filePath.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
      }
    }
  }))
  server.use('/qiantai', (req, res, next) => {
    const reqPath = req.path.replace(/^\/qiantai/, '') || '/'
    if (reqPath.startsWith('/assets/')) {
      return res.status(404).send('Not Found')
    }
    const indexPath = path.join(qiantaiDist, 'index.html')
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath)
    } else {
      next()
    }
  })
} else {
  console.log('⚠️  前台 dist 目录不存在: ' + qiantaiDist)
}

// 根路径重定向到前台
server.get('/', (req, res) => {
  res.redirect('/qiantai')
})

// ================= 收 token 并验证的中间件 =================
server.use((req, res, next) => {
  // 放行：静态文件、登录注册、上传、评论等公开接口
  if (req.path === '/api/login' || req.path === '/api/register' || req.path === '/api/upload-avatar' || req.path === '/api/upload-tupian' || req.path.startsWith('/uploads/') || req.path === '/api/dianzan' || req.path === '/api/shoucang' || req.path === '/api/dianzan-status' || req.path === '/api/shoucang-status' || req.path === '/api/pinglun' || req.path.startsWith('/api/pinglun/') || req.path.startsWith('/qiantai') || req.path.startsWith('/houtai') || req.path === '/' || req.path.endsWith('.js') || req.path.endsWith('.css') || req.path.endsWith('.html') || req.path.endsWith('.png') || req.path.endsWith('.jpg') || req.path.endsWith('.svg') || req.path.endsWith('.ico') || req.path.endsWith('.woff') || req.path.endsWith('.woff2')) {
    return next()
  }

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ code: 401, message: '没有 token，请先登录' })
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ code: 401, message: 'token 格式错误' })
  }

  const token = authHeader.split(' ')[1]

  if (!token || !token.startsWith('fake-token')) {
    return res.status(401).json({ code: 401, message: 'token 无效或已过期' })
  }

  next()
})

// ================= 登录接口 =================
server.post('/api/login', (req, res) => {
  const { username, password } = req.body
  const users = router.db.get('yonghulist').value()

  const user = users.find(item => item.yonghuming === username && item.mima === password)
  if (user) {
    return res.json({
      code: 200,
      token: 'fake-token-' + Date.now(),
      userId: user.id,
      username: user.yonghuming,
      avatar: user.avatar || '',
      message: '登录成功'
    })
  } else {
    return res.status(401).json({ code: 401, message: '账号或密码错误' })
  }
})

// ================= 注册接口 =================
server.post('/api/register', (req, res) => {
  const { username, password } = req.body
  const users = router.db.get('yonghulist').value()

  if (users.find(u => u.yonghuming === username)) {
    return res.status(400).json({ code: 400, message: '账号已存在' })
  }

  const maxId = users.reduce((max, u) => Math.max(max, u.id || 0), 0)
  const newUser = {
    id: maxId + 1,
    yonghuming: username,
    mima: password
  }

  router.db.get('yonghulist').push(newUser).write()

  return res.json({ code: 200, message: '注册成功' })
})

// ================= 阅读量接口 =================
server.post('/api/read', (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ code: 400, message: '缺少新闻 id' })
  }

  const newsList = router.db.get('zhanshishuju')
  const news = newsList.find({ id: id }).value()

  if (!news) {
    return res.status(404).json({ code: 404, message: '新闻不存在' })
  }

  const newCount = (news.yueduLiang || 0) + 1
  newsList
    .find({ id: id })
    .assign({ yueduLiang: newCount })
    .write()

  return res.json({
    code: 200,
    yueduLiang: newCount,
    message: '阅读量已更新'
  })
})

// ================= 点赞接口 =================
server.post('/api/dianzan', (req, res) => {
  const { userId, articleId } = req.body
  if (!userId || !articleId) {
    return res.status(400).json({ code: 400, message: '缺少 userId 或 articleId' })
  }

  const users = router.db.get('yonghulist')
  const user = users.find({ id: Number(userId) }).value()
  if (!user) {
    return res.status(404).json({ code: 404, message: '用户不存在' })
  }

  if (!Array.isArray(user.isdianzan)) {
    user.isdianzan = []
  }

  const index = user.isdianzan.indexOf(articleId)
  if (index !== -1) {
    user.isdianzan.splice(index, 1)
    users.find({ id: Number(userId) }).assign({ isdianzan: user.isdianzan }).write()
    return res.json({ code: 200, liked: false, message: '已取消点赞' })
  } else {
    user.isdianzan.push(articleId)
    users.find({ id: Number(userId) }).assign({ isdianzan: user.isdianzan }).write()
    return res.json({ code: 200, liked: true, message: '点赞成功' })
  }
})

// ================= 收藏接口 =================
server.post('/api/shoucang', (req, res) => {
  const { userId, articleId } = req.body
  if (!userId || !articleId) {
    return res.status(400).json({ code: 400, message: '缺少 userId 或 articleId' })
  }

  const users = router.db.get('yonghulist')
  const user = users.find({ id: Number(userId) }).value()
  if (!user) {
    return res.status(404).json({ code: 404, message: '用户不存在' })
  }

  if (!Array.isArray(user.ishouchang)) {
    user.ishouchang = []
  }

  const index = user.ishouchang.indexOf(articleId)
  if (index !== -1) {
    user.ishouchang.splice(index, 1)
    users.find({ id: Number(userId) }).assign({ ishouchang: user.ishouchang }).write()
    return res.json({ code: 200, shoucanged: false, message: '已取消收藏' })
  } else {
    user.ishouchang.push(articleId)
    users.find({ id: Number(userId) }).assign({ ishouchang: user.ishouchang }).write()
    return res.json({ code: 200, shoucanged: true, message: '收藏成功' })
  }
})

// ================= 查询点赞/收藏状态接口 =================
server.get('/api/dianzan-status', (req, res) => {
  const { userId, articleId } = req.query
  if (!userId || !articleId) {
    return res.status(400).json({ code: 400, message: '缺少参数' })
  }
  const user = router.db.get('yonghulist').find({ id: Number(userId) }).value()
  if (!user || !Array.isArray(user.isdianzan)) {
    return res.json({ code: 200, liked: false })
  }
  return res.json({ code: 200, liked: user.isdianzan.includes(articleId) })
})

server.get('/api/shoucang-status', (req, res) => {
  const { userId, articleId } = req.query
  if (!userId || !articleId) {
    return res.status(400).json({ code: 400, message: '缺少参数' })
  }
  const user = router.db.get('yonghulist').find({ id: Number(userId) }).value()
  if (!user || !Array.isArray(user.ishouchang)) {
    return res.json({ code: 200, shoucanged: false })
  }
  return res.json({ code: 200, shoucanged: user.ishouchang.includes(articleId) })
})

// ================= 头像上传接口 =================
server.post('/api/upload-avatar', (req, res) => {
  const { base64, userId } = req.body
  if (!base64 || !userId) {
    return res.status(400).json({ code: 400, message: '缺少图片或用户ID' })
  }
  const matches = base64.match(/^data:image\/(\w+);base64,(.+)$/)
  if (!matches) {
    return res.status(400).json({ code: 400, message: '图片格式错误' })
  }
  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1]
  const data = matches[2]
  const buffer = Buffer.from(data, 'base64')
  const filename = `avatar_${userId}_${Date.now()}.${ext}`
  const filepath = path.join(uploadDir, filename)
  fs.writeFileSync(filepath, buffer)
  const url = `/uploads/${filename}`
  return res.json({ code: 200, url, message: '上传成功' })
})

// ================= 新闻图片上传接口 =================
server.post('/api/upload-tupian', (req, res) => {
  const { base64 } = req.body
  if (!base64) {
    return res.status(400).json({ code: 400, message: '缺少图片数据' })
  }
  const matches = base64.match(/^data:image\/(\w+);base64,(.+)$/)
  if (!matches) {
    return res.status(400).json({ code: 400, message: '图片格式错误' })
  }
  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1]
  const data = matches[2]
  const buffer = Buffer.from(data, 'base64')
  const filename = `news_${Date.now()}.${ext}`
  const filepath = path.join(uploadDir, filename)
  fs.writeFileSync(filepath, buffer)
  const url = `/uploads/${filename}`
  return res.json({ code: 200, url, message: '上传成功' })
})

// ================= 修改密码接口 =================
server.post('/api/change-password', (req, res) => {
  const { userId, oldPassword, newPassword } = req.body

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({ code: 400, message: '请填写完整信息' })
  }

  const users = router.db.get('yonghulist')
  const user = users.find({ id: Number(userId) }).value()

  if (!user) {
    return res.status(404).json({ code: 404, message: '用户不存在' })
  }

  if (user.mima !== oldPassword) {
    return res.status(400).json({ code: 400, message: '原密码错误' })
  }

  if (oldPassword === newPassword) {
    return res.status(400).json({ code: 400, message: '新密码不能与旧密码相同' })
  }

  users
    .find({ id: Number(userId) })
    .assign({ mima: newPassword })
    .write()

  return res.json({ code: 200, message: '密码修改成功' })
})

// ================= 评论接口 =================
server.get('/api/pinglun', (req, res) => {
  const { xinwenId } = req.query
  if (!xinwenId) {
    return res.status(400).json({ code: 400, message: '缺少新闻id' })
  }
  const pinglunList = router.db.get('pinglunlist').value()
  const list = pinglunList
    .filter(item => item.xinwenId === xinwenId)
    .sort((a, b) => new Date(b.shijian) - new Date(a.shijian))
  return res.json({ code: 200, data: list })
})

server.post('/api/pinglun', (req, res) => {
  const { xinwenId, userId, username, neirong, avatar } = req.body
  if (!xinwenId || !userId || !neirong) {
    return res.status(400).json({ code: 400, message: '缺少必要参数' })
  }
  if (neirong.trim().length === 0) {
    return res.status(400).json({ code: 400, message: '评论内容不能为空' })
  }
  if (neirong.length > 500) {
    return res.status(400).json({ code: 400, message: '评论不能超过500字' })
  }
  const pinglun = {
    id: 'pl_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    xinwenId,
    userId,
    username: username || '匿名用户',
    avatar: avatar || '',
    neirong: neirong.trim(),
    shijian: new Date().toISOString(),
    dianzan: 0
  }
  router.db.get('pinglunlist').push(pinglun).write()
  return res.json({ code: 200, data: pinglun, message: '评论成功' })
})

server.delete('/api/pinglun/:id', (req, res) => {
  const { id } = req.params
  const pinglunList = router.db.get('pinglunlist')
  const pinglun = pinglunList.find({ id }).value()
  if (!pinglun) {
    return res.status(404).json({ code: 404, message: '评论不存在' })
  }
  pinglunList.remove({ id }).write()
  return res.json({ code: 200, message: '删除成功' })
})

// ================= 路由别名：前端请求路径 → 数据库表名 =================
// 前端请求 /zhanshidataList → /zhanshishuju
// 前端请求 /rejectedList → /bohuishuju

// 路由别名表
const urlMap = {
  '/zhanshidataList': '/zhanshishuju',
  '/rejectedList': '/bohuishuju',
  '/zhongzhuandataList': '/zhongzhuanshuju'
}

server.use((req, res, next) => {
  for (const [from, to] of Object.entries(urlMap)) {
    if (req.url === from || req.url.startsWith(from + '?')) {
      req.url = req.url.replace(from, to)
      console.log('🔄 别名转发: ' + from + ' -> ' + req.url)
      break
    }
  }
  next()
})

// ================= 其他请求走 json-server =================
server.use(router)

const PORT = process.env.PORT || 3000
server.listen(PORT, '0.0.0.0', () => {
  console.log('✅ 后端已启动：http://localhost:' + PORT)
  console.log('   🏠 前台展示: http://localhost:' + PORT + '/qiantai')
  console.log('   ⚙️  后台管理: http://localhost:' + PORT + '/houtai')
  console.log('   - 登录 POST /api/login')
  console.log('   - 注册 POST /api/register')
  console.log('   - 阅读量 POST /api/read')
  console.log('   - 点赞 POST /api/dianzan')
  console.log('   - 收藏 POST /api/shoucang')
  console.log('   - 点赞状态 GET /api/dianzan-status')
  console.log('   - 收藏状态 GET /api/shoucang-status')
  console.log('   - 头像上传 POST /api/upload-avatar')
  console.log('   - 修改密码 POST /api/change-password')
  console.log('   - 图片访问 /uploads/xxx')
  console.log('   - 原数据接口如 GET /zhanshishuju 正常工作')
})
