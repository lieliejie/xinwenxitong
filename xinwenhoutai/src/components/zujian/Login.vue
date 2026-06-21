<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2 class="login-title">新闻管理系统</h2>
      <p class="login-subtitle">管理员登录</p>

      <div class="login-form" @submit.prevent="denglu">
        <input
          v-model="yonghuming"
          type="text"
          placeholder="请输入账号"
          class="login-input"
          @keyup.enter="handleUserEnter"
          :disabled="jiazaiZhong"
        />
        <input
          v-model="mima"
          type="password"
          placeholder="请输入密码"
          class="login-input"
          ref="mimaRef"
          @keyup.enter="denglu"
          :disabled="jiazaiZhong"
        />

        <div v-if="cuowuXinxi" class="error-tip">{{ cuowuXinxi }}</div>

        <button class="login-btn" type="submit" :disabled="jiazaiZhong" @click="denglu">
          {{ jiazaiZhong ? '登录中...' : '登录' }}
        </button>

        <div class="switch-link">
          <router-link to="/zhuce">还没有账号？去注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../fengzhuang/axios'

const router = useRouter()

const yonghuming = ref('')
const mima = ref('')
const cuowuXinxi = ref('')
const jiazaiZhong = ref(false)
const mimaRef = ref(null)

const handleUserEnter = () => {
  if (!yonghuming.value.trim()) {
    cuowuXinxi.value = '请输入账号'
    return
  }
  cuowuXinxi.value = ''
  mimaRef.value?.focus()
}

const denglu = async () => {
  if (!yonghuming.value.trim()) {
    cuowuXinxi.value = '请输入账号'
    return
  }
  if (!mima.value.trim()) {
    cuowuXinxi.value = '请输入密码'
    return
  }

  jiazaiZhong.value = true
  cuowuXinxi.value = ''

  try {
    const res = await http.post('/api/login', {
      username: yonghuming.value,
      password: mima.value
      
        
        
        
      
      
    })

    
    
    
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('username', res.data.username)
    
    

    await router.push('/shouye')
  } catch (err) {
    if (err.response?.status === 401) {
      cuowuXinxi.value = err.response.data.message || '账号或密码错误'
    } else {
      cuowuXinxi.value = '网络请求失败，请稍后重试'
    }
  } finally {
    jiazaiZhong.value = false
  }
}
watch(() => mima.value, () => {
  if (mima.value === '') {
    cuowuXinxi.value = ''
  }
})
</script>

<style scoped>
.login-wrapper {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  background: #fff;
  width: 380px;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.login-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 35px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.login-input {
  height: 44px;
  padding: 0 15px;
  border: 1px solid #eee;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: 0.3s;
}

.login-input:focus {
  border-color: #07c160;
}

.error-tip {
  color: #f56c6c;
  font-size: 12px;
  text-align: left;
  height: 12px;
}

.login-btn {
  height: 46px;
  background: #07c160;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  background: #06ad56;
}

.login-btn:disabled {
  background: #a0d4b0;
  cursor: not-allowed;
}

.switch-link {
  margin-top: 10px;
  font-size: 13px;
}
</style>