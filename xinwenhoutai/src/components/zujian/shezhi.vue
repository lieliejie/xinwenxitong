<template>
  <div class="settings-page">
    
    <div v-show="route.path === '/shezhi'">
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
        <router-link 
        v-for="item in shezhiList"
        :to="item.path" 
         class="link-item">
          <div class="menu-item">
            <div class="menu-left">
              <span class="icon">{{ item.icon }}</span>
              <span class="text">{{ item.text }}</span>
            </div>
            <span class="arrow">></span>
          </div>
        </router-link>
      </div>
    </div>

    
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import useStore from "../pinia";

const route = useRoute()
const store = useStore();

const shezhiList = [
  { path: '/shezhi/zhanghao', icon: '👤', text: '我的账号' },
  { path: '/shezhi/zhuti', icon: '🎨', text: '主题设置' },
  { path: '/shezhi/tongzhi', icon: '🔔', text: '消息通知' },
  { path: '/shezhi/beifen', icon: '💾', text: '数据备份' },
  { path: '/shezhi/xitong', icon: 'ℹ️', text: '关于系统' },
];
</script>

<style scoped>

.link-item {
  text-decoration: none;
  color: inherit;
  display: block;
}


.settings-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px 20px;
  background: var(--bg-color, #f5f7fa);
  min-height: 100vh;
  transition: background 0.3s;
}

.settings-card {
  background: var(--card-bg, #ffffff);
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: var(--shadow, 0 4px 15px rgba(0, 0, 0, 0.04));
  transition: all 0.25s ease;
}
.settings-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover, 0 6px 20px rgba(0, 0, 0, 0.06));
}

.header-box {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-box {
  width: 70px;
  height: 70px;
  background: var(--primary-gradient, linear-gradient(135deg, #07c160, #06b057));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-box .icon {
  font-size: 36px;
  color: var(--btn-text, #fff);
}

.header-info h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color, #121212);
  margin: 0 0 4px 0;
  transition: color 0.3s;
}
.header-info p {
  font-size: 14px;
  color: var(--text-secondary, #888);
  margin: 0;
  transition: color 0.3s;
}

.menu-wrapper {
  background: var(--card-bg, #fff);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow, 0 4px 15px rgba(0, 0, 0, 0.04));
  transition: background 0.3s, box-shadow 0.3s;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  font-size: 16px;
  border-bottom: 1px solid var(--border-color, #f2f2f2);
  cursor: pointer;
  transition: all 0.2s ease;
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-item:active {
  background: var(--bg-color, #f7f7f7);
  transform: scale(0.98);
}
.menu-item:hover {
  background: var(--hover-bg, #fafafa);
  padding-left: 28px;
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
  color: var(--text-color, #222);
  font-weight: 500;
  transition: color 0.3s;
}

.arrow {
  color: var(--text-muted, #ccc);
  font-size: 16px;
}
</style>