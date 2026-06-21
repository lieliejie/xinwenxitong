<template>
  <div class="register-wrapper">
    <div class="register-container">
      <h2 class="register-title">新闻管理系统</h2>
      <p class="register-subtitle">管理员注册</p>

      <div class="register-form">
        <input
          v-model="yonghuming"
          type="text"
          placeholder="请输入账号"
          class="register-input"
          :disabled="jiazaiZhong"
        />
        <input
          v-model="mima"
          type="password"
          placeholder="请输入密码"
          class="register-input"
          :disabled="jiazaiZhong"
        />
        <input
          v-model="queRenMima"
          type="password"
          placeholder="请确认密码"
          class="register-input"
          @keyup.enter="zhuce"
          :disabled="jiazaiZhong"
        />

        <div v-if="cuowuXinxi" class="error-tip">{{ cuowuXinxi }}</div>

        <button class="register-btn" @click="zhuce" :disabled="jiazaiZhong">
          {{ jiazaiZhong ? '注册中...' : '注册' }}
        </button>

        <div class="switch-link">
          <router-link to="/login">已有账号？去登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../fengzhuang/axios'

const router = useRouter()
const yonghuming = ref('')
const mima = ref('')
const queRenMima = ref('')
const cuowuXinxi = ref('')
const jiazaiZhong = ref(false)

const zhuce = async () => {
  cuowuXinxi.value = ''

  if (!yonghuming.value.trim()) {
    cuowuXinxi.value = '请输入账号'
    return
  }
  if (!mima.value.trim()) {
    cuowuXinxi.value = '请输入密码'
    return
  }
  if (mima.value !== queRenMima.value) {
    cuowuXinxi.value = '两次输入的密码不一致'
    return
  }

  jiazaiZhong.value = true

  try {
    await http.post('/api/register', {
      username: yonghuming.value,
      password: mima.value
    })
    router.push('/login')
  } catch (err) {
    if (err.response?.status === 400) {
      cuowuXinxi.value = err.response.data.message || '账号已存在'
    } else {
      cuowuXinxi.value = '网络请求失败，请稍后重试'
    }
  } finally {
    jiazaiZhong.value = false
  }
}
</script>

<style scoped>
.register-wrapper {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-container {
  background: #fff;
  width: 380px;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.register-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
}

.register-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 35px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.register-input {
  height: 44px;
  padding: 0 15px;
  border: 1px solid #eee;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: 0.3s;
}

.register-input:focus {
  border-color: #07c160;
}

.error-tip {
  color: #f56c6c;
  font-size: 12px;
  text-align: left;
  height: 12px;
}

.register-btn {
  height: 46px;
  background: #07c160;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s;
}

.register-btn:disabled {
  background: #a0d4b0;
  cursor: not-allowed;
}

.register-btn:hover:not(:disabled) {
  background: #06ad56;
}

.switch-link {
  margin-top: 10px;
  font-size: 14px;
}

.switch-link a {
  color: #07c160;
  text-decoration: none;
}

.switch-link a:hover {
  text-decoration: underline;
}
</style>