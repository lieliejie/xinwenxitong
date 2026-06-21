<template>
  <div class="tuichu-page">
    <div class="card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">🚪</span>
        </div>
        <div class="header-info">
          <h3>退出登录</h3>
          <p>确认退出当前账号</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="form-wrapper">
      <p class="confirm-text">确定要退出当前账号吗？退出后需要重新登录。</p>
      <div class="btn-group">
        <button class="btn confirm-btn" @click="tuichu">确认退出</button>
        <button class="btn back-btn" @click="router.back()">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const tuichu = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isLogin')
  localStorage.removeItem('userId')
  sessionStorage.clear()
  router.push('/login')
}
</script>

<style scoped>
.tuichu-page {
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
  background: linear-gradient(135deg, #f56c6c, #e04848);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-box .icon {
  font-size: 36px;
  color: #fff;
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
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  transition: background 0.3s, box-shadow 0.3s;
}

.confirm-text {
  font-size: 15px;
  color: var(--text-secondary, #888);
  margin-bottom: 30px;
  line-height: 1.6;
}

.btn-group {
  display: flex;
  gap: 14px;
}

.btn {
  flex: 1;
  height: 46px;
  border-radius: 10px;
  font-size: 15px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
.btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.confirm-btn {
  background: linear-gradient(135deg, #f56c6c, #e04848);
  color: #fff;
}
.back-btn {
  background: var(--btn-gray, #f2f2f2);
  color: var(--btn-gray-text, #666);
}
</style>
