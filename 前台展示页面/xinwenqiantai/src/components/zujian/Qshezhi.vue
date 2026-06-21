<template>
        <Qdaohang></Qdaohang>
  <div class="settings-page">
 
    <div class="settings-card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">⚙️</span>
        </div>
        <div class="header-info">
          <h3>系统设置</h3>
          <p>新闻资讯管理系统 · 配置中心</p>
        </div>
      </div>
    </div>

    <div class="menu-wrapper">
      <div 
        v-for="item in shezhiList" 
        :key="item.id"
        class="menu-item"
      >
       <router-link :to="item.path">
         <div class="menu-left">
          <span class="icon">{{ item.icon }}</span>
          <span class="text">{{ item.text }}</span>
        </div>
        <span class="arrow">></span>
       </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>

import Qdaohang from './Qdaohang.vue';

const shezhiList = [
  { id: 1, icon: '👤', text: '我的账号', path: '/QQzhanghao' },
  { id: 2, icon: '🎨', text: '主题设置', path: '/QQzhuti' },
  { id: 3, icon: '🔔', text: '消息通知', path: '/Qxiaoxitongzhi' },
  { id: 4, icon: '💾', text: '数据备份', path: '#' },
  { id: 5, icon: 'ℹ️', text: '关于系统', path: '#' },
]
</script>

<style scoped>
a{
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 24px;
  
}
.settings-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px 20px;
  background: var(--bg-color);
  min-height: 100vh;
  transition: background 0.3s;
}

.settings-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: var(--shadow);
  transition: all 0.25s ease;
}
.settings-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.header-box {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-box {
  width: 70px;
  height: 70px;
  background: var(--primary-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-box .icon {
  font-size: 36px;
  color: var(--btn-text);
}

.header-info h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 4px 0;
  transition: color 0.3s;
}
.header-info p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  transition: color 0.3s;
}

.menu-wrapper {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: background 0.3s, box-shadow 0.3s;
}

.menu-item {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
}
.menu-item:last-child {
  border-bottom: none;
}
a:active {
  background: var(--hover-bg);
  transform: scale(0.98);
}
a:hover {
  background: var(--hover-bg);
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.menu-left .icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}
.text {
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.3s;
}

.arrow {
  color: var(--text-muted);
  font-size: 16px;
}
</style>
