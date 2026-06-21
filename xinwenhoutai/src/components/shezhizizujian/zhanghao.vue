<template>
  <div class="wode-zhanghao-page">
    <div class="zhanghao-card">
      <div class="header-box">
        <div class="icon-box">
          <img v-if="userAvatar" :src="userAvatar" class="user-avatar" />
          <span v-else class="icon">👤</span>
        </div>
        <div class="header-info">
          <h3>{{ userNickname || '我的账号' }}</h3>
          <p>账号管理与安全中心</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="menu-wrapper">
      <router-link to="/shezhi/zhanghao/gerenziliao" class="menu-item">
        <div class="menu-left">
          <span class="icon">👤</span>
          <span class="text">个人资料</span>
        </div>
        <span class="arrow">></span>
      </router-link>

      <router-link to="/shezhi/zhanghao/xiugaimima" class="menu-item">
        <div class="menu-left">
          <span class="icon">🔒</span>
          <span class="text">修改密码</span>
        </div>
        <span class="arrow">></span>
      </router-link>

      <div class="menu-item" @click="logout">
        <div class="menu-left">
          <span class="icon">🔄</span>
          <span class="text">切换账号</span>
        </div>
        <span class="arrow">></span>
      </div>

      <div class="menu-item logout" @click="logout">
        <div class="menu-left">
          <span class="icon">🚪</span>
          <span class="text">退出登录</span>
        </div>
        <span class="arrow">></span>
      </div>

      <div class="menu-item" @click="router.back()">
        <div class="menu-left">
          <span class="icon">🔙</span>
          <span class="text">返回</span>
        </div>
        <span class="arrow">></span>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../fengzhuang/axios.ts'

const router = useRouter()

const userNickname = ref('')
const userAvatar = ref('')

onMounted(async () => {
  const rawId = localStorage.getItem('userId')
  const uid = rawId && rawId !== 'undefined' && rawId !== 'null' ? rawId : ''
  if (!uid) return
  try {
    const res = await http.get('/yonghulist/' + uid)
    if (res.data) {
      userNickname.value = res.data.nickname || res.data.yonghuming || ''
      const avatar = res.data.avatar || ''
      if (avatar) {
        if (avatar.startsWith('data:')) userAvatar.value = avatar
        else if (avatar.startsWith('http')) userAvatar.value = avatar
        else userAvatar.value = 'http://localhost:3000' + avatar
      }
    }
  } catch (err) {
    console.error('获取用户信息失败:', err)
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isLogin')
  localStorage.removeItem('userId')
  router.push('/login')
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
.wode-zhanghao-page {
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
  box-sizing: border-box;
  position: relative;
}

.zhanghao-card {
  background: var(--card-bg, #fff);
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: var(--shadow, 0 4px 15px rgba(0, 0, 0, 0.04));
  position: relative;
  transition: all 0.25s ease;
}
.zhanghao-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
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
  overflow: hidden;
  flex-shrink: 0;
}
.icon-box .icon {
  font-size: 36px;
  color: #fff;
}
.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.logout .text {
  color: var(--danger-color, #f56c6c);
}

.wode-zhanghao-page > router-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 25px 20px;
  box-sizing: border-box;
}
</style>
