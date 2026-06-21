<template>
    <Qdaohang></Qdaohang>
  <div class="zhuti-page">
    
    <div class="card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">{{ isDark ? '🌙' : '☀️' }}</span>
        </div>
        <div class="header-info">
          <h3>主题设置</h3>
          <p>切换夜间与白天模式</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    
    <div class="form-wrapper">
      <div class="theme-item">
        <div class="theme-left">
          <span class="theme-icon">{{ isDark ? '🌙' : '☀️' }}</span>
          <div class="theme-text">
            <span class="theme-label">夜间模式</span>
            <span class="theme-desc">{{ isDark ? '已开启夜间模式' : '已关闭夜间模式' }}</span>
          </div>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="isDark" @change="toggleTheme" />
          <span class="slider"></span>
        </label>
      </div>

      <div class="btn-group">
        <button class="btn back-btn" @click="router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Qdaohang from '../Qdaohang.vue'

const router = useRouter()


const isDark = ref(false)


const applyTheme = (dark) => {
  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}


const toggleTheme = () => {
  applyTheme(isDark.value)
}


onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved === 'dark'
  applyTheme(isDark.value)
})
</script>

<style scoped>
.zhuti-page {
  max-width: 1200px;
  margin: 0 auto;
   margin-top: 35px;
  background: transparent;
}

.card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: var(--shadow);
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
  background: var(--btn-gray);
  color: var(--btn-gray-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.close-btn:hover {
  background: var(--text-muted);
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
  background: linear-gradient(135deg, #333, #555);
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
  color: var(--text-color);
}
.header-info p {
  font-size: 14px;
  color: var(--text-secondary);
}

.form-wrapper {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px 40px;
  box-shadow: var(--shadow);
  transition: background 0.3s, box-shadow 0.3s;
}

.theme-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.theme-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-icon {
  font-size: 28px;
}

.theme-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.theme-label {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
}
.theme-desc {
  font-size: 13px;
  color: var(--text-secondary);
}


.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  flex-shrink: 0;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--text-muted);
  border-radius: 28px;
  transition: 0.3s;
}
.slider::before {
  content: '';
  position: absolute;
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: var(--btn-text);
  border-radius: 50%;
  transition: 0.3s;
}
.switch input:checked + .slider {
  background-color: var(--text-color);
}
.switch input:checked + .slider::before {
  transform: translateX(24px);
}

.btn-group {
  margin-top: 30px;
  display: flex;
  gap: 14px;
}

.btn {
  width: 100px;
  height: 46px;
  border-radius: 8px;
  font-size: 15px;
  border: none;
  cursor: pointer;
}

.back-btn {
  background: var(--btn-gray);
  color: var(--btn-gray-text);
}
.back-btn:hover {
  opacity: 0.8;
}
</style>
