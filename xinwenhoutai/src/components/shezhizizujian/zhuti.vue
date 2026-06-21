<template>
  <div class="kaifa-page">
    <div class="empty-card">
      <div class="icon">🚧</div>
      <h3>功能开发中···</h3>
      <p>敬请期待，猎猎杰正在努力建设中...</p>
      <button class="back-btn" @click="$router.back()">返回上一页</button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

.kaifa-page {
  width: 100%;
  
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.empty-card {
  background: #fff;
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
  width: 100%;
}

.empty-card .icon {
  font-size: 50px;
  margin-bottom: 20px;
}

.empty-card h3 {
  font-size: 20px;
  color: #333;
  margin: 0 0 10px;
}

.empty-card p {
  font-size: 14px;
  color: #999;
  margin: 0 0 30px;
}

.back-btn {
  height: 44px;
  padding: 0 30px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  color: #666;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.back-btn:hover {
  background: #eaeaea;
}
</style>