<template>
  <div class="tongzhi-page">
    <div class="card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">🔔</span>
        </div>
        <div class="header-info">
          <h3>消息通知</h3>
          <p>查看驳回通知，了解审核反馈</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="form-wrapper history-wrapper">
      <div class="section-title">📋 最近通知记录</div>
      <div class="history-list">
        <div class="history-item" v-for="item in store.rejectedList" :key="item.id">
          <router-link
            :to="'/boxiangxixinxi/' + item.id"
            class="history-link"
          >
          <div class="history-left">
            <div class="history-info">
              <span class="history-title">{{ item.biaoTi }}</span>
              <span class="history-time">{{ item.time }}</span>
            </div>
          </div>
          </router-link>
          <span class="history-status-text">驳回</span>
        </div>
        <div v-if="!store.rejectedList || store.rejectedList.length === 0" class="empty-tip">
          暂无通知记录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useStore from '../pinia/index.ts'

let router = useRouter()
let store = useStore()
</script>

<style scoped>
.tongzhi-page {
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
}

.card {
  background: var(--card-bg, #fff);
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: var(--shadow, 0 4px 15px rgba(0, 0, 0, 0.04));
  position: relative;
  transition: background 0.3s, box-shadow 0.3s;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--btn-gray, #f2f2f2);
  color: var(--btn-gray-text, #666);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.close-btn:hover {
  background: var(--text-muted, #ccc);
  color: #fff;
  transform: scale(1.1);
}

.header-box {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-box {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #fa8c16, #ffa940);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-box .icon {
  font-size: 36px;
}

.header-info h3 {
  font-size: 20px;
  margin: 0 0 4px;
  color: var(--text-color, #121212);
  transition: color 0.3s;
}
.header-info p {
  font-size: 14px;
  color: var(--text-secondary, #888);
  margin: 0;
  transition: color 0.3s;
}

.form-wrapper {
  background: var(--card-bg, #fff);
  border-radius: 20px;
  padding: 32px 40px;
  box-shadow: var(--shadow, 0 4px 15px rgba(0, 0, 0, 0.04));
  margin-bottom: 24px;
  transition: background 0.3s, box-shadow 0.3s;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color, #121212);
  margin-bottom: 6px;
  transition: color 0.3s;
}

.history-wrapper {
  padding-bottom: 28px;
}

.history-list {
  margin-top: 16px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color, #f2f2f2);
  border-radius: 8px;
  transition: background 0.3s ease, border-color 0.3s, padding-left 0.3s;
}
.history-item:hover {
  background: var(--hover-bg, #fafafa);
  padding-left: 8px;
}
.history-item:last-child {
  border-bottom: none;
}

.history-link {
  text-decoration: none;
  flex: 1;
  min-width: 0;
  color: inherit;
  display: flex;
  align-items: center;
}

.history-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.history-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.history-title {
  font-size: 15px;
  color: var(--text-color, #121212);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s;
}
.history-time {
  font-size: 12px;
  color: var(--text-muted, #999);
  transition: color 0.3s;
}

.history-status-text {
  font-size: 15px;
  color: red;
  flex-shrink: 0;
  margin-left: 12px;
}

.empty-tip {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted, #999);
  font-size: 14px;
}
</style>
