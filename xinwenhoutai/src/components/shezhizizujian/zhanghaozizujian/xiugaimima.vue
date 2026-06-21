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
      <span class="close-btn" @click="router.push('/zhanghao')" title="返回">✕</span>
    </div>

    <div class="form-wrapper">
      <div class="input-item">
        <label>原密码</label>
        <div class="input-box">
          <input
            v-model="yuanmima"
            :type="isyuanmima ? 'text' : 'password'"
            placeholder="请输入原密码"
          />
          <span class="eye-icon" @click="isyuanmima = !isyuanmima">
            <span class="eye-closed">👁</span>
          </span>
        </div>
      </div>

      <div class="input-item">
        <label>新密码</label>
        <div class="input-box">
          <input
            v-model="xinmima"
            :type="isxinmima ? 'text' : 'password'"
            placeholder="请输入新密码"
          />
          <span class="eye-icon" @click="isxinmima = !isxinmima">
            <span class="eye-closed">👁</span>
          </span>
        </div>
      </div>

      <div class="input-item">
        <label>确认密码</label>
        <div class="input-box">
          <input
            v-model="querenmima"
            :type="isquerenmima ? 'text' : 'password'"
            placeholder="请确认新密码"
          />
          <span class="eye-icon" @click="isquerenmima = !isquerenmima">
            <span class="eye-closed">👁</span>
          </span>
        </div>
      </div>

      <p v-if="errorMsg" class="error-tip">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success-tip">{{ successMsg }}</p>

      <div class="button">
        <button class="btn save" :disabled="baocunzhong" @click="baocun">{{ baocunzhong ? '保存中...' : '保存修改' }}</button>
        <button class="btn back" @click="router.push('/shezhi/zhanghao')">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../../fengzhuang/axios.ts'

let router = useRouter()
let yuanmima = ref('')
let xinmima = ref('')
let querenmima = ref('')
let baocunzhong = ref(false)
let isyuanmima = ref(false)
let isxinmima = ref(false)
let isquerenmima = ref(false)
let errorMsg = ref('')
let successMsg = ref('')

let baocun = async () => {
  baocunzhong.value = true
  errorMsg.value = ''
  successMsg.value = ''
  if (!yuanmima.value || !xinmima.value || !querenmima.value) {
    errorMsg.value = '请填写完整'
    baocunzhong.value = false
    return
  }
  if (xinmima.value !== querenmima.value) {
    errorMsg.value = '确认密码不一致'
    baocunzhong.value = false
    return
  }
  if (xinmima.value.length < 6) {
    errorMsg.value = '新密码长度不能少于6位'
    baocunzhong.value = false
    return
  }
  try {
    const userId = localStorage.getItem('userId')
    await http.post('/api/change-password', {
      userId: Number(userId),
      oldPassword: yuanmima.value,
      newPassword: xinmima.value
    })
    successMsg.value = '密码修改成功'
    yuanmima.value = ''
    xinmima.value = ''
    querenmima.value = ''
  } catch (error) {
    errorMsg.value = error.response?.data?.message || '修改密码失败'
  } finally {
    baocunzhong.value = false
  }
}
</script>

<style scoped>
.xiugaimima-page {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 25px 20px;
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
}
.header-info p {
  font-size: 14px;
  color: var(--text-secondary, #888);
}

.form-wrapper {
  background: var(--card-bg, #fff);
  border-radius: 20px;
  padding: 32px 40px;
  box-shadow: var(--shadow, 0 4px 15px rgba(0, 0, 0, 0.04));
  transition: background 0.3s, box-shadow 0.3s;
  max-width: 500px;
  margin: 0 auto;
}

.input-item {
  margin-bottom: 20px;
}
.input-item label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: var(--text-color, #222);
}

.input-box {
  position: relative;
  width: 100%;
}
.input-box input {
  width: 100%;
  height: 44px;
  padding: 0 40px 0 12px;
  border: 1px solid var(--input-border, #ddd);
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  background: var(--input-bg, #fff);
  color: var(--text-color, #222);
  transition: background 0.3s, border-color 0.3s, color 0.3s;
}
.input-box input:focus {
  border-color: #07c160;
  box-shadow: 0 0 0 3px rgba(7, 193, 96, 0.1);
  outline: none;
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
  color: var(--text-muted, #999);
  font-size: 18px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
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

.btn {
  width: 100px;
  height: 46px;
  border-radius: 8px;
  font-size: 15px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}
.button {
  display: flex;
  gap: 30px;
}
.save {
  background: var(--primary-color, #07c160);
  color: var(--btn-text, #fff);
}
.save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.back {
  background: var(--btn-gray, #f2f2f2);
  color: var(--btn-gray-text, #666);
}

.error-tip {
  color: var(--danger-color, #f56c6c);
  font-size: 13px;
  margin: 8px 0 0 0;
}
.success-tip {
  color: #07c160;
  font-size: 13px;
  margin: 8px 0 0 0;
}
</style>
