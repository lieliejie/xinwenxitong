<template>
  <div class="home-container">
    
    <div class="welcome-section">
      <div class="welcome-left">
      
        <div class="brand-tag">
        </div>
        <h1 class="welcome-title">欢迎回来，管理员</h1>
        <p class="welcome-subtitle">{{ today }} · 高效管理，从这里开始</p>
      </div>
    </div>

    
    <div class="stats-section">
      <!-- 加载中骨架 -->
      <div v-if="loading" class="stats-grid">
        <div v-for="i in 4" :key="'skel-' + i" class="stat-card stat-skeleton">
          <div class="skeleton-icon"></div>
          <div class="skeleton-value"></div>
          <div class="skeleton-label"></div>
        </div>
      </div>
      <!-- 加载失败 -->
      <div v-else-if="loadError" class="stats-error">
        <span>⚠️ 数据加载失败</span>
        <button class="retry-btn" @click="fetchStats">重试</button>
      </div>
      <!-- 正常数据 -->
      <div v-else class="stats-grid">
        <div class="stat-card" v-for="item in statsList" :key="item.id" @click="goToRoute(item.path)">
          <div class="stat-top">
            <div class="stat-icon" :style="{ background: item.iconBg, color: item.iconColor }">
              {{ item.icon }}
            </div>
            <span v-if="item.trend !== 0" class="stat-trend" :class="item.trend > 0 ? 'up' : 'down'">
              {{ item.trend > 0 ? '↑' : '↓' }} {{ Math.abs(item.trend) }}%
            </span>
          </div>
          <div class="stat-value">{{ item.value }}</div>
          <div class="stat-label">{{ item.label }}</div>
        </div>
      </div>
    </div>

    <!-- 快捷入口
    <div class="quick-section">
      <div class="quick-grid">
        <router-link 
          v-for="item in quickList" 
          :key="item.path"
          :to="item.path"
          class="quick-card"
        >
          <div class="quick-icon" :style="{ background: item.iconBg }">
            {{ item.icon }}
          </div>
          <span class="quick-name">{{ item.name }}</span>
        </router-link>
      </div>
    </div> -->

    
    <div class="notice-section">
      <div class="notice-header">
        <span class="notice-title">系统公告</span>
        <span class="notice-more">查看全部</span>
      </div>
      <div class="notice-list">
        <div class="notice-item" v-for="item in notices" :key="item.id">
          <span class="notice-dot"></span>
          <span class="notice-text">{{ item.title }}</span>
          <span class="notice-time">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { http } from '../fengzhuang/axios.ts';

const router = useRouter();

const today = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long'
});

// 格式化大数字
const formatNum = (n: number): string => {
  if (n >= 10000) {
    return (n / 10000).toFixed(n % 10000 === 0 ? 0 : 1) + '万'
  }
  return n.toLocaleString()
}

// 统计卡片配置（固定 UI 信息 + 动态 value/trend）
const statsList = ref([
  { id: 1, icon: '👥', iconBg: '#e6f7ef', iconColor: '#07c160', label: '注册用户', value: '--', trend: 0, path: '/users' },
  { id: 2, icon: '📰', iconBg: '#e8f3ff', iconColor: '#1677ff', label: '新闻总数', value: '--', trend: 0, path: '/news' },
  { id: 3, icon: '📊', iconBg: '#fff7e6', iconColor: '#fa8c16', label: '总阅读量', value: '--', trend: 0, path: '/tongji' },
  { id: 4, icon: '💬', iconBg: '#fff1f0', iconColor: '#f5222d', label: '待处理', value: '--', trend: 0, path: '/shezhi' },
]);

// 加载中/错误状态
const loading = ref(true);
const loadError = ref(false);

// 从后端获取统计数据
const fetchStats = async () => {
  loading.value = true;
  loadError.value = false;
  try {
    const res = await http.get('/api/home-stats');
    if (res.data && res.data.code === 200) {
      const d = res.data.data;
      statsList.value[0].value = formatNum(d.userCount || 0);
      statsList.value[1].value = formatNum(d.newsCount || 0);
      statsList.value[2].value = formatNum(d.totalViews || 0);
      // 待处理 = 驳回数（可选展示发布数）
      statsList.value[3].value = formatNum(d.rejectedCount || 0);

      // 趋势暂时用 0（后端可扩展），也可根据实际数据计算
      statsList.value[0].trend = 0;
      statsList.value[1].trend = 0;
      statsList.value[2].trend = 0;
      statsList.value[3].trend = 0;
    } else {
      loadError.value = true;
    }
  } catch (err) {
    console.error('获取首页统计数据失败:', err);
    loadError.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchStats();
});

const goToRoute = (path: string) => {
  if (path) {
    router.push(path);
  }
};

// 系统公告保留静态数据（可后续扩展为动态 API）
const notices = ref([
  { id: 1, title: '系统已成功部署上线，欢迎使用后台管理系统', time: '今天' },
  { id: 2, title: '请定期备份数据库文件 dbs.json，以防数据丢失', time: '今天' },
  { id: 3, title: '如有功能需求或问题反馈，请联系系统管理员', time: '1天前' },
]);
</script>

<style scoped>

:root {
  --wechat-green: #07c160;
  --wechat-bg: #f5f5f5;
  --wechat-card: #ffffff;
  --wechat-text-primary: #333333;
  --wechat-text-secondary: #666666;
  --wechat-text-tertiary: #999999;
  --wechat-border: #e5e5e5;
}

.home-container {
  padding: 20px;
  background-color: var(--wechat-bg);
  min-height: 100vh;
}


.welcome-section {
  background: var(--wechat-card);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  border: 1px solid var(--wechat-border);
}

.brand-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--wechat-green);
  padding: 4px 12px;
  border-radius: 12px;
  margin-bottom: 12px;
}

.brand-icon {
  font-size: 14px;
}

.brand-name {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.welcome-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--wechat-text-primary);
  margin: 0 0 8px 0;
}

.welcome-subtitle {
  font-size: 14px;
  color: var(--wechat-text-tertiary);
  margin: 0;
}


.stats-section {
  margin-bottom: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: var(--wechat-card);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--wechat-border);
  transition: all 0.2s ease;
  cursor: pointer;
}

.stat-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stat-trend {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.stat-trend.up {
  color: var(--wechat-green);
  background: #e6f7ef;
}

.stat-trend.down {
  color: #f5222d;
  background: #fff1f0;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--wechat-text-primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: var(--wechat-text-tertiary);
}


.quick-section {
  margin-bottom: 16px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.quick-card {
  background: var(--wechat-card);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  border: 1px solid var(--wechat-border);
  transition: all 0.2s ease;
}

.quick-card:hover {
  border-color: var(--wechat-green);
  box-shadow: 0 2px 8px rgba(7, 193, 96, 0.1);
}

.quick-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.quick-name {
  font-size: 14px;
  color: var(--wechat-text-primary);
  font-weight: 500;
}


.notice-section {
  background: var(--wechat-card);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--wechat-border);
}

.notice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.notice-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--wechat-text-primary);
}

.notice-more {
  font-size: 13px;
  color: var(--wechat-green);
  cursor: pointer;
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notice-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
}

.notice-item:last-child {
  border-bottom: none;
}

.notice-dot {
  width: 6px;
  height: 6px;
  background: var(--wechat-green);
  border-radius: 50%;
  flex-shrink: 0;
}

.notice-text {
  flex: 1;
  font-size: 14px;
  color: var(--wechat-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notice-time {
  font-size: 12px;
  color: var(--wechat-text-tertiary);
  flex-shrink: 0;
}


/* 骨架屏 */
.stat-skeleton {
  cursor: default;
  pointer-events: none;
}
.skeleton-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 12px;
}
.skeleton-value {
  width: 60%;
  height: 28px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 8px;
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

/* 错误提示 */
.stats-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  color: #999;
  font-size: 14px;
}
.retry-btn {
  padding: 4px 16px;
  border: 1px solid var(--wechat-green);
  border-radius: 4px;
  background: #fff;
  color: var(--wechat-green);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.retry-btn:hover {
  background: var(--wechat-green);
  color: #fff;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .quick-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>