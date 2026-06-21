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
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="form-wrapper">
      <div class="input-item">
        <label>原密码</label>
        <div class="input-box">
          <input
            :type="showOld ? 'text' : 'password'"
            v-model="oldPassword"
            placeholder="请输入原密码"
          />
          <span class="eye-icon" @click="showOld = !showOld">
            <span class="eye-closed">👁</span>
          </span>
        </div>
      </div>

      <div class="input-item">
        <label>新密码</label>
        <div class="input-box">
          <input
            :type="showNew ? 'text' : 'password'"
            v-model="newPassword"
            placeholder="请输入新密码"
          />
          <span class="eye-icon" @click="showNew = !showNew">
            <span class="eye-closed">👁</span>
          </span>
        </div>
      </div>

      <div class="input-item">
        <label>确认密码</label>
        <div class="input-box">
          <input
            :type="showConfirm ? 'text' : 'password'"
            v-model="confirmPassword"
            placeholder="请确认新密码"
          />
          <span class="eye-icon" @click="showConfirm = !showConfirm">
            <span class="eye-closed">👁</span>
          </span>
        </div>
      </div>

      <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>

      <div class="btn-group">
        <button class="btn save-btn" @click="changePassword">保存修改</button>
        <button class="btn back-btn" @click="router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../../fengzhuang/axios.ts'

const router = useRouter()

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showOld = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const changePassword = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    errorMsg.value = '请填写所有密码字段'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    errorMsg.value = '两次输入的新密码不一致'
    return
  }
  if (newPassword.value.length < 6) {
    errorMsg.value = '新密码长度不能少于6位'
    return
  }

  try {
    await http.post('/api/change-password', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    })
    successMsg.value = '密码修改成功'
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err) {
    errorMsg.value = err.response?.data?.message || '密码修改失败，请检查原密码是否正确'
  }
}
</script>

<style scoped>
.xiugaimima-page {
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
  transition: background 0.3s, box-shadow 0.3s;
}

.input-item {
  margin-bottom: 22px;
}
.input-item label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color, #222);
  transition: color 0.3s;
}

.input-box {
  position: relative;
  width: 100%;
}
.input-box input {
  width: 100%;
  height: 46px;
  padding: 0 44px 0 14px;
  border: 1px solid var(--input-border, #ddd);
  border-radius: 10px;
  font-size: 15px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #222);
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s, background 0.3s, color 0.3s;
}
.input-box input:focus {
  border-color: #07c160;
  box-shadow: 0 0 0 3px rgba(7, 193, 96, 0.1);
}
.input-box input::placeholder {
  color: var(--text-muted, #999);
}

.eye-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--text-muted, #999);
  font-size: 18px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: color 0.2s;
}
.eye-icon:hover {
  color: var(--text-secondary, #666);
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

.error-msg {
  color: #f56c6c;
  font-size: 14px;
  margin: 8px 0;
}
.success-msg {
  color: #07c160;
  font-size: 14px;
  margin: 8px 0;
}

.btn-group {
  margin-top: 30px;
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

.save-btn {
  background: linear-gradient(135deg, #07c160, #06b057);
  color: #fff;
}
.back-btn {
  background: var(--btn-gray, #f2f2f2);
  color: var(--btn-gray-text, #666);
}
</style>
