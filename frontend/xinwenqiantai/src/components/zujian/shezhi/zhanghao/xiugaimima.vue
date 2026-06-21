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
            v-model="yuanmima"
            :type="isyuanmima ? 'text' : 'password'"
            placeholder="请输入原密码"
          />
          <span class="eye-icon" @click="isyuanmima = !isyuanmima">
            <span v-if="!isyuanmima" class="eye-closed">👁</span>
            <span v-else class="eye-open">👁</span>
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
            <span v-if="!isxinmima" class="eye-closed">👁</span>
            <span v-else class="eye-open">👁</span>
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
            <span v-if="!isquerenmima" class="eye-closed">👁</span>
            <span v-else class="eye-open">👁</span>
          </span>
        </div>
      </div>

      <p v-if="errorMsg" class="error-tip">{{ errorMsg }}</p>

      <div class="button">
        <button class="btn save" :disabled="baocunzhong" @click="baocun">{{ baocunzhong ? '保存中...' : '保存修改' }}</button>
      <button class="btn back" @click="router.back()">返回</button>
      </div>
    </div>

   
  </div>
</template>

<script setup>
import { ref } from 'vue';
import http from '../../../axios';
import { useRouter } from 'vue-router';
let router = useRouter()
let yuanmima = ref('')
let xinmima = ref('')
let querenmima = ref('')
let baocunzhong = ref(false)
let isyuanmima = ref(false)

let isxinmima = ref(false)

let isquerenmima = ref(false)

let errorMsg = ref('')
let baocun = async ()=>{
    baocunzhong.value = true
    errorMsg.value = ''  
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
  try {
     const userId = localStorage.getItem('userId')
    let res = await http.post('/api/change-password', {
        userId: Number(userId),
        oldPassword: yuanmima.value,
        newPassword: xinmima.value
    })
    
    errorMsg.value = ''
  } catch (error) {
   
    errorMsg.value = '修改密码失败'
    
  }
  finally{
    baocunzhong.value = false
    errorMsg.value = ''
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
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: var(--shadow);
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
  background: var(--btn-gray);
  color: var(--btn-gray-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.close-btn:hover {
  background: var(--text-muted);
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
  color: var(--text-color);
}
.header-info p {
  font-size: 14px;
  color: var(--text-secondary);
}

.form-wrapper {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px 40px;
  box-shadow: var(--shadow);
  transition: background 0.3s, box-shadow 0.3s;
}

.input-item {
  margin-bottom: 20px;
}
.input-item label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: var(--text-color);
}

.input-box {
  position: relative;
  width: 100%;
}
.input-box input {
  width: 100%;
  height: 44px;
  padding: 0 40px 0 12px;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  background: var(--input-bg);
  color: var(--text-color);
  transition: background 0.3s, border-color 0.3s, color 0.3s;
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
  color: var(--text-muted);
  font-size: 18px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
}
.eye-icon:hover {
  color: var(--text-secondary);
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
  width: 100px;
  height: 46px;
  border-radius: 8px;
  font-size: 15px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
}
.button{
    display: flex;
    gap: 30px;
}
.save {
  background: var(--primary-color);
  color: var(--btn-text);
}
.back {
  background: var(--btn-gray);
  color: var(--btn-gray-text);
}

.error-tip {
  color: var(--danger-color);
  font-size: 13px;
  margin: 8px 0 0 0;
}
</style>