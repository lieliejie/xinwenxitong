<template>
  <div class="page-container">
    
    <div class="card-group">
      <router-link
          :to="{path:'/news'}"
        > 
      <div class="stat-card">
        <div class="card-icon green">📰</div>
        <div class="card-content">
          <div class="card-label">总新闻稿件</div>
          <div class="card-value">{{ store.dataList.length }}</div>
        </div></div>
      </router-link>
      <div class="stat-card">
        <div class="card-icon green">✍️</div>
        <div class="card-content">
          <div class="card-label">今日发布</div>
          <div class="card-value">28</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="card-icon orange">⏳</div>
        <div class="card-content">
          <div class="card-label">待审核稿件</div>
          <div class="card-value">12</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="card-icon green">👁️</div>
        <div class="card-content">
          <div class="card-label">总阅读量</div>
          <div class="card-value">128,560</div>
        </div>
      </div>
    </div>

    
    <div class="content-section">
      
      <div class="section-card">
        <div class="section-header">
          <span class="section-title">📅 最近发布</span>
          <span class="section-more">查看全部 →</span>
        </div>
        <div class="news-list">
          <div v-for="item in recentNews" :key="item.id" class="news-item">
            <div class="news-title">{{ item.title }}</div>
            <div class="news-meta">
              <span class="meta-item">📝 {{ item.author }}</span>
              <span class="meta-item">🕐 {{ item.time }}</span>
              <span class="meta-tag" :class="item.status === '已发布' ? 'tag-green' : 'tag-orange'">
                {{ item.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      
      <div class="section-card">
        <div class="section-header">
          <span class="section-title">🔥 热门新闻TOP5</span>
          <span class="section-more">查看排行 →</span>
        </div>
        <div class="hot-list">
          <div v-for="(item, index) in hotNews" :key="item.id" class="hot-item">
            <span class="hot-rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
            <div class="hot-content">
              <div class="hot-title">{{ item.title }}</div>
              <div class="hot-views">👁️ {{ item.views.toLocaleString() }} 阅读</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useStore from '../pinia';
let store = useStore()

const recentNews = ref([
  { id: 1, title: '我市召开2026年度新闻工作会议', author: '张三', time: '10分钟前', status: '已发布' },
  { id: 2, title: '乡村振兴战略实施成效显著', author: '李四', time: '30分钟前', status: '已发布' },
  { id: 3, title: '智慧城市建设项目正式启动', author: '王五', time: '1小时前', status: '待审核' },
  { id: 4, title: '文化旅游节吸引游客突破10万', author: '赵六', time: '2小时前', status: '已发布' },
  { id: 5, title: '科技创新大赛获奖名单公示', author: '钱七', time: '3小时前', status: '已发布' }
])


const hotNews = ref([
  { id: 1, title: '突发！我市迎来强降雨天气', views: 28560 },
  { id: 2, title: '2026年高考政策最新解读', views: 21340 },
  { id: 3, title: '地铁3号线预计年底通车', views: 18920 },
  { id: 4, title: '老旧小区改造工程全面推进', views: 15670 },
  { id: 5, title: '本地特色农产品展销会开幕', views: 12450 }
])
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
</style>