<template>
  <div class="xiugaimima-page">
    <div class="card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">🔒</span>
        </div>
        <div class="header-info">
          <h3>修改密码</h3>
          <p>修改当前账号密码</p>
        </div>
      </div>
    </div>

    <div class="form-wrapper">
      <div class="input-item">
        <label>原密码</label>
        <div class="input-box">
          <input
            type="password"
            placeholder="请输入原密码"
          />
          <span class="eye-icon">
            <span class="eye-closed">👁</span>
          </span>
        </div>
      </div>

      <div class="input-item">
        <label>新密码</label>
        <div class="input-box">
          <input
            type="password"
            placeholder="请输入新密码"
          />
          <span class="eye-icon">
            <span class="eye-closed">👁</span>
          </span>
        </div>
      </div>

      <div class="input-item">
        <label>确认密码</label>
        <div class="input-box">
          <input
            type="password"
            placeholder="请确认新密码"
          />
          <span class="eye-icon">
            <span class="eye-closed">👁</span>
          </span>
        </div>
      </div>

      <button class="btn save">保存修改</button>
      <button class="btn back">返回</button>
    </div>


  </div>
</template>

<script setup>

</script>

<style scoped>
.xiugaimima-page {
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
}

.card {
  background: #ffffff;
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
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
  margin: 0 0 4px;
}
.header-info p {
  font-size: 14px;
  color: #888;
}

.form-wrapper {
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.04);
  max-width: 460px;
  margin: 0 auto;
}

.input-item {
  margin-bottom: 20px;
}
.input-item label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
}

.input-box {
  position: relative;
  width: 100%;
}
.input-box input {
  width: 100%;
  height: 44px;
  padding: 0 40px 0 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
}

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
input::-webkit-credentials-auto-fill-button {
  visibility: hidden;
  display: none !important;
  pointer-events: none;
}

.eye-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  font-size: 18px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
}
.eye-icon:hover {
  color: #666;
}

.eye-closed {
  position: relative;
  display: inline-block;
}
.eye-closed::after {
  content: '';
  position: absolute;
  left: -2px;
  top: 50%;
  width: calc(100% + 4px);
  height: 2px;
  background: currentColor;
  transform: rotate(-45deg);
  transform-origin: center;
  border-radius: 1px;
}

.eye-open {
  display: inline-block;
}

.btn {
  width: 100%;
  height: 46px;
  border-radius: 8px;
  font-size: 15px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}
.save {
  background: #07c160;
  color: #fff;
}
.back {
  background: #f2f2f2;
  color: #666;
}
</style>