<template>
  <div class="kaifa-page">
    <div class="card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">💾</span>
        </div>
        <div class="header-info">
          <h3>数据备份</h3>
          <p>备份与恢复系统数据</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="form-wrapper">
      <div class="empty-content">
        <div class="empty-icon">🚧</div>
        <h3>功能开发中···</h3>
        <p>敬请期待，猎猎杰正在努力建设中...</p>
      </div>
      <div class="btn-group">
        <button class="btn back-btn" @click="router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.kaifa-page {
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
  background: linear-gradient(135deg, #4a90d9, #357abd);
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
  text-align: center;
  transition: background 0.3s, box-shadow 0.3s;
}

.empty-content {
  padding: 40px 0;
}
.empty-icon {
  font-size: 50px;
  margin-bottom: 20px;
}
.empty-content h3 {
  font-size: 20px;
  color: var(--text-color, #333);
  margin: 0 0 10px;
}
.empty-content p {
  font-size: 14px;
  color: var(--text-muted, #999);
  margin: 0;
}

.btn-group {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.btn {
  width: 120px;
  height: 46px;
  border-radius: 8px;
  font-size: 15px;
  border: none;
  cursor: pointer;
}

.back-btn {
  background: var(--btn-gray, #f2f2f2);
  color: var(--btn-gray-text, #666);
}
.back-btn:hover {
  opacity: 0.8;
}
</style>
