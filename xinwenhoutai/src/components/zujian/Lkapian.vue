<template>
  <div class="page-container">
    <!-- 加载中骨架 -->
    <div v-if="loading" class="card-group">
      <div v-for="i in 4" :key="'skel-' + i" class="stat-card stat-skeleton">
        <div class="skeleton-icon"></div>
        <div class="card-content">
          <div class="skeleton-value"></div>
          <div class="skeleton-label"></div>
        </div>
      </div>
    </div>

    <!-- 加载失败 -->
    <div v-else-if="loadError" class="stats-error">
      <span>⚠️ 数据加载失败</span>
      <button class="retry-btn" @click="fetchData">重试</button>
    </div>

    <!-- 正常展示 -->
    <template v-else>
      <!-- 统计卡片 -->
      <div class="card-group">
        <div class="stat-card" @click="goToRoute('/news')">
          <div class="card-icon green">📰</div>
          <div class="card-content">
            <div class="card-label">总新闻稿件</div>
            <div class="card-value">{{ stats.totalNews }}</div>
          </div>
        </div>
        <div class="stat-card" @click="goToRoute('/news')">
          <div class="card-icon green">✍️</div>
          <div class="card-content">
            <div class="card-label">今日发布</div>
            <div class="card-value">{{ stats.todayPublished }}</div>
          </div>
        </div>
        <div class="stat-card" @click="goToRoute('/news')">
          <div class="card-icon orange">⏳</div>
          <div class="card-content">
            <div class="card-label">待审核稿件</div>
            <div class="card-value">{{ stats.pendingReview }}</div>
          </div>
        </div>
        <div class="stat-card" @click="goToRoute('/tongji')">
          <div class="card-icon green">👁️</div>
          <div class="card-content">
            <div class="card-label">总阅读量</div>
            <div class="card-value">{{ stats.totalViews.toLocaleString() }}</div>
          </div>
        </div>
      </div>

      <!-- 下方内容区 -->
      <div class="content-section">
        <!-- 模块1：最近发布 -->
        <div class="section-card">
          <div class="section-header">
            <span class="section-title">📅 最近发布</span>
            <span class="section-more" @click="goToRoute('/news')">查看全部 →</span>
          </div>
          <div class="news-list">
            <div v-for="item in recentNews" :key="item.id" class="news-item" @click="goToDetail(item.id)">
              <div class="news-title">{{ item.title }}</div>
              <div class="news-meta">
                <span class="meta-item">📝 {{ item.author }}</span>
                <span class="meta-item">🕐 {{ item.date }}</span>
                <span class="meta-tag tag-green">{{ item.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 模块2：热门新闻TOP5 -->
        <div class="section-card">
          <div class="section-header">
            <span class="section-title">🔥 热门新闻TOP5</span>
            <span class="section-more" @click="goToRoute('/news')">查看排行 →</span>
          </div>
          <div class="hot-list">
            <div v-for="(item, index) in hotNews" :key="item.id" class="hot-item" @click="goToDetail(item.id)">
              <span class="hot-rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
              <div class="hot-content">
                <div class="hot-title">{{ item.title }}</div>
                <div class="hot-views">👁️ {{ item.views.toLocaleString() }} 阅读</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../fengzhuang/axios.ts'

const router = useRouter()

// 状态
const loading = ref(true)
const loadError = ref(false)

// 统计数据
const stats = ref({
  totalNews: 0,
  todayPublished: 0,
  pendingReview: 0,
  totalViews: 0
})

// 最近发布列表
const recentNews = ref([])

// 热门新闻TOP5
const hotNews = ref([])

// 从数据库获取数据（兼容 Railway 旧版后端：多 API 并行拼接）
const fetchData = async () => {
  loading.value = true
  loadError.value = false
  try {
    // 并行请求所有可用 API（axios 自动带 token，登录后均可访问）
    const [homeRes, zhanshiRes, zhongzhuanRes, bohuiRes] = await Promise.all([
      http.get('/api/home-stats'),
      http.get('/zhanshidataList'),
      http.get('/zhongzhuandataList'),
      http.get('/rejectedList')
    ])

    const homeData = homeRes.data?.data || {}
    const zhanshiList = Array.isArray(zhanshiRes.data) ? zhanshiRes.data : []
    const zhongzhuanList = Array.isArray(zhongzhuanRes.data) ? zhongzhuanRes.data : []
    const bohuiList = Array.isArray(bohuiRes.data) ? bohuiRes.data : []
    const allNews = [...zhanshiList, ...zhongzhuanList, ...bohuiList]

    // 4 张统计卡片
    const today = new Date().toISOString().split('T')[0]
    stats.value = {
      totalNews: homeData.publishedCount || zhanshiList.length || 0,
      todayPublished: zhanshiList.filter(item => item.riQi === today).length,
      pendingReview: zhongzhuanList.length,
      totalViews: allNews.reduce((sum, item) => sum + (item.yueduLiang || 0), 0)
    }

    // 最近发布 TOP5（按日期倒序）
    recentNews.value = zhanshiList
      .sort((a, b) => new Date(b.riQi) - new Date(a.riQi))
      .slice(0, 5)
      .map(item => ({
        id: item.id,
        title: item.biaoTi,
        author: item.laiYuan,
        date: item.riQi,
        status: '已发布'
      }))

    // 热门新闻 TOP5（按阅读量降序）
    hotNews.value = allNews
      .sort((a, b) => (b.yueduLiang || 0) - (a.yueduLiang || 0))
      .slice(0, 5)
      .map(item => ({
        id: item.id,
        title: item.biaoTi,
        views: item.yueduLiang || 0
      }))

  } catch (err) {
    console.error('获取统计页面数据失败:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

// 路由跳转
const goToRoute = (path) => {
  if (path) {
    router.push(path)
  }
}

// 跳转到新闻详情
const goToDetail = (id) => {
  if (id) {
    router.push({ name: 'newsdetail', params: { id } })
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* 页面容器：统一内边距 */
a{
  text-decoration: none;
}
.page-container {
  padding: 20px;
  background-color: #fafafa;
  min-height: 100%;
}

/* 原有统计卡片样式（保留） */
.card-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
 
}

.stat-card {
  flex: 1;
  min-width: 250px;
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.card-icon.green {
  width: 50px;
  height: 50px;
  background-color: #07c160;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  margin-right: 20px;
  flex-shrink: 0;
}

.card-icon.orange {
  width: 50px;
  height: 50px;
  background-color: #ff9500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  margin-right: 20px;
  flex-shrink: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-label {
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* 新增：下方内容区样式 */
.content-section {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.section-card {
  flex: 1;
  min-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.section-more {
  font-size: 14px;
  color: #07c160;
  cursor: pointer;
}

/* 最近发布列表 */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-item {
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.news-item:last-child {
  border-bottom: none;
}

.news-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.news-meta {
  display: flex;
  gap: 15px;
  align-items: center;
}

.meta-item {
  font-size: 12px;
  color: #999;
}

.meta-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.tag-green {
  background-color: #e8f8f0;
  color: #07c160;
}

.tag-orange {
  background-color: #fff5e6;
  color: #ff9500;
}

/* 热门新闻TOP5 */
.hot-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hot-rank {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  flex-shrink: 0;
}

.rank-1 { background-color: #ff4d4f; }
.rank-2 { background-color: #ff7a45; }
.rank-3 { background-color: #ffc53d; }
.rank-4, .rank-5 { background-color: #d9d9d9; color: #666; }

.hot-content {
  flex: 1;
  overflow: hidden;
}

.hot-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-views {
  font-size: 12px;
  color: #999;
}

/* 骨架屏 */
.stat-skeleton {
  cursor: default;
  pointer-events: none;
}
.skeleton-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-right: 20px;
  flex-shrink: 0;
}
.skeleton-value {
  width: 60%;
  height: 24px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 5px;
}
.skeleton-label {
  width: 40%;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* 错误状态 */
.stats-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  color: #999;
  font-size: 14px;
}
.retry-btn {
  padding: 4px 16px;
  border: 1px solid #07c160;
  border-radius: 4px;
  background: #fff;
  color: #07c160;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.retry-btn:hover {
  background: #07c160;
  color: #fff;
}

/* 响应式 */
@media (max-width: 768px) {
  .card-group {
    flex-direction: column;
  }
  .stat-card {
    min-width: auto;
  }
  .content-section {
    flex-direction: column;
  }
  .section-card {
    min-width: auto;
  }
}
</style>