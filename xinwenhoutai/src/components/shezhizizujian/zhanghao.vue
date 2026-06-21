<template>
  <div class="wode-zhanghao-page">
    <div class="zhanghao-card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">👤</span>
        </div>
        <div class="header-info">
          <h3>我的账号</h3>
          <p>账号管理与安全中心</p>
        </div>
      </div>
    </div>

    <div class="menu-wrapper">
    <router-link 
   
    >
     <div class="menu-item">
        <div class="menu-left">
          <span class="icon">👤</span>
          <span class="text">个人资料</span>
        </div>
        <span class="arrow">></span>
      </div>
  </router-link>

      <div class="menu-item">
        <div class="menu-left">
          <span class="icon">🔒</span>
          <span class="text">修改密码</span>
        </div>
        <span class="arrow">></span>
      </div>

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

      <div class="menu-item link-item" @click="router.back()">
        <div class="menu-left">
          <span class="icon">🔙</span>
          <span class="text">返回</span>
        </div>
        <span class="arrow">></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()



const logout = () => {
  
  localStorage.removeItem("isLogin");
  
  router.push("/login");
};
</script>

<style scoped>
.link-item {
  text-decoration: none;
  color: inherit;
}
.wode-zhanghao-page {
  max-width: 1200px;
  margin: 0 auto;
  background: #f5f7fa;
  box-sizing: border-box;
  position: relative;
 
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
.zhanghao-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  transition: all 0.25s ease;
}
.zhanghao-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
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
}
.icon-box .icon {
  font-size: 36px;
  color: #fff;
}

.header-info h3 {
  font-size: 20px;
  font-weight: 600;
  color: #121212;
  margin: 0 0 4px 0;
}
.header-info p {
  font-size: 14px;
  color: #888;
  margin: 0;
}

.menu-wrapper {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  font-size: 16px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  transition: all 0.2s ease;
}
.menu-item:last-child {
  border-bottom: none;
}
.menu-item:active {
  background: #f7f7f7;
  transform: scale(0.98);
}
.menu-item:hover {
  background: #fafafa;
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
  color: #222;
  font-weight: 500;
}

.arrow {
  color: #ccc;
  font-size: 16px;
}

.logout .text {
  color: #f56c6c;
}


</style>