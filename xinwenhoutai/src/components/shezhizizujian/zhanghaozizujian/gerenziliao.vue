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
    </div>

    <div class="form-wrapper">
      <div class="item">
        <label>登录账号</label>
        <div class="val">lieliejie</div>
      </div>
      <div class="item">
        <label>角色权限</label>
        <div class="val">超级管理员</div>
      </div>
      <div class="item">
        <label>登录状态</label>
        <div class="val">已登录</div>
      </div>

      <button class="btn back-btn" @click="$router.back()">返回</button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.gerenziliao-page {
  max-width: 1200px;
  margin: 0 auto;
  background: #f5f7fa;
}

.card {
  background: #fff;
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.04);
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
}
.header-info p {
  font-size: 14px;
  color: #888;
  margin: 0;
}

.form-wrapper {
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.04);
  max-width: 460px;
  margin: 0 auto;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f2f2f2;
}
.item:last-child {
  border-bottom: none;
}
.item label {
  color: #666;
  font-size: 15px;
}
.val {
  color: #222;
  font-size: 15px;
}

.back-btn {
  width: 100%;
  height: 46px;
  border-radius: 8px;
  border: none;
  background: #f2f2f2;
  color: #666;
  font-size: 15px;
  margin-top: 30px;
  cursor: pointer;
}
</style>