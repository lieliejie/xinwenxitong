<template>
  <div class="gerenziliao-page">
    <div class="card">
      <div class="header-box">
        <div class="icon-box">👤</div>
        <div class="header-info">
          <h3>个人资料</h3>
          <p>查看与修改个人信息</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="form-wrapper">
      <div class="item">
        <label>登录账号</label>
        <div class="val">{{ username || 'lieliejie' }}</div>
      </div>
      <div class="item">
        <label>角色权限</label>
        <div class="val">超级管理员</div>
      </div>
      <div class="item">
        <label>登录状态</label>
        <div class="val status-online">已登录</div>
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
import { http } from '../../fengzhuang/axios.ts'

const router = useRouter()
const username = ref('')

onMounted(async () => {
  const uid = localStorage.getItem('userId')
  if (!uid || uid === 'undefined' || uid === 'null') return
  try {
    const res = await http.get('/yonghulist/' + uid)
    if (res.data) {
      username.value = res.data.yonghuming || ''
    }
  } catch (err) {
    console.error('获取用户信息失败:', err)
  }
})
</script>

<style scoped>
.gerenziliao-page {
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
  background: linear-gradient(135deg, #07c160, #06b057);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  transition: background 0.3s, box-shadow 0.3s;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid var(--border-color, #f2f2f2);
  transition: border-color 0.3s;
}
.item:last-of-type {
  border-bottom: none;
}
.item label {
  color: var(--text-secondary, #666);
  font-size: 15px;
}
.val {
  color: var(--text-color, #222);
  font-size: 15px;
  font-weight: 500;
}
.status-online {
  color: #07c160;
}

.btn-group {
  margin-top: 30px;
  display: flex;
  gap: 14px;
}

.btn {
  width: 100%;
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
