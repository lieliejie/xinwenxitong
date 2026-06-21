<template>
  <div class="page-container">
    
    <!-- 加载骨架屏 -->
    <div v-if="loading" class="card-group">
      <div v-for="i in 4" :key="'skel-' + i" class="stat-card stat-skeleton">
        <div class="skeleton-icon"></div>
        <div class="skeleton-content">
          <div class="skeleton-label"></div>
          <div class="skeleton-value"></div>
        </div>
      </div>
    </div>
    <!-- 加载失败 -->
    <div v-else-if="loadError" class="stats-error">
      <span>⚠️ 数据加载失败</span>
      <button class="retry-btn" @click="fetchData">重试</button>
    </div>
    <!-- 正常数据 -->
    <div v-else class="card-group">
      <div class="stat-card" @click="goToRoute('/news')">
        <div class="card-icon green">📰</div>
        <div class="card-content">
          <div class="card-label">总新闻稿件</div>
          <div class="card-value">{{ formatNum(stats.totalNews) }}</div>
        </div>
      </div>
      <div class="stat-card" @click="goToRoute('/news')">
        <div class="card-icon green">✍️</div>
        <div class="card-content">
          <div class="card-label">今日发布</div>
          <div class="card-value">{{ formatNum(stats.todayPublished) }}</div>
        </div>
      </div>
      <div class="stat-card" @click="goToRoute('/news')">
        <div class="card-icon orange">⏳</div>
        <div class="card-content">
          <div class="card-label">待审核稿件</div>
          <div class="card-value">{{ formatNum(stats.pendingReview) }}</div>
        </div>
      </div>
      <div class="stat-card" @click="goToRoute('/tongji')">
        <div class="card-icon green">👁️</div>
        <div class="card-content">
          <div class="card-label">总阅读量</div>
          <div class="card-value">{{ formatNum(stats.totalViews) }}</div>
        </div>
      </div>
    </div>

    
    <div class="content-section">
      
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
          <div v-if="recentNews.length === 0" class="empty-tip">暂无发布数据</div>
        </div>
      </div>

      
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
          <div v-if="hotNews.length === 0" class="empty-tip">暂无热度数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../fengzhuang/axios.ts'

const router = useRouter()

// 格式化大数字
const formatNum = (n: number): string => {
  if (n >= 10000) {
    return (n / 10000).toFixed(n % 10000 === 0 ? 0 : 1) + '万'
  }
  return n.toLocaleString()
}

// 路由跳转
const goToRoute = (path: string) => {
  if (path) {
    router.push(path)
  }
}

// 路由跳转到新闻详情页，并携带新闻唯一标识符
const goToDetail = (id: string) => {
  if (id) {
    router.push({ name: 'newsdetail', params: { id } })
  }
}

// 统计数据
const stats = reactive({
  totalNews: 0,
  todayPublished: 0,
  pendingReview: 0,
  totalViews: 0
})

// 最近发布列表
const recentNews = ref([])

// 热门新闻TOP5
const hotNews = ref([])

// 加载状态
const loading = ref(true)
const loadError = ref(false)

// 获取数据
const fetchData = async () => {
  loading.value = true
  loadError.value = false
  try {
    const res = await http.get('/api/tongji-data')
    if (res.data && res.data.code === 200) {
      const d = res.data.data
      stats.totalNews = d.totalNews || 0
      stats.todayPublished = d.todayPublished || 0
      stats.pendingReview = d.pendingReview || 0
      stats.totalViews = d.totalViews || 0
      recentNews.value = d.recentNews || []
      hotNews.value = d.hotNews || []
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('获取统计页面数据失败:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>

a{
  text-decoration: none;
}
.page-container {
  padding: 20px;
  background-color: #fafafa;
  min-height: 100%;
}


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
  cursor: pointer;
  transition: all 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
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


.news-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-item {
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background 0.15s ease;
}
.news-item:hover {
  background: #f9fdf9;
  padding-left: 6px;
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


.hot-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background 0.15s ease;
  padding: 4px 0;
}
.hot-item:hover {
  background: #f9fdf9;
  padding-left: 6px;
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
.skeleton-content {
  flex: 1;
}
.skeleton-label {
  width: 50%;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 8px;
}
.skeleton-value {
  width: 70%;
  height: 24px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* 错误提示 */
.stats-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 30px;
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

/* 空数据提示 */
.empty-tip {
  text-align: center;
  color: #bbb;
  font-size: 14px;
  padding: 20px 0;
}
</style>