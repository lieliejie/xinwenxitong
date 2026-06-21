<template>
  <div class="tuichu-box">
    <h3>退出登录</h3>
    <p>确定要退出当前账号吗？</p>
    <button class="tuichu-btn" @click="tuichu">确认退出</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const tuichu = () => {
  
  localStorage.clear()
  sessionStorage.clear()
  router.push('/login')
  
}






  


</script>

<style scoped>
.tuichu-box {
  max-width: 400px;
  margin: 40px auto;
  text-align: center;
  padding: 30px;
}

.tuichu-box h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 12px;
}

.tuichu-box p {
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}

.tuichu-btn {
  height: 42px;
  padding: 0 40px;
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s;
}

.tuichu-btn:hover {
  background: #e04040;
}
</style>
