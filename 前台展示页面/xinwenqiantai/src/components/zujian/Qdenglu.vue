<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2 class="login-title">新闻资讯平台</h2>
      <p class="login-subtitle">用户登录</p>

      <div class="login-form">
        <input
          type="text"
          placeholder="请输入账号"
          class="login-input"
          v-model="username"
          @keyup.enter="tiaomima"
        />
        <input
          ref="mimaShuru"
          type="password"
          placeholder="请输入密码"
          class="login-input"
          v-model="password"
 
        />

        <div v-if="cuowuXinxi" class="error-tip">{{ cuowuXinxi }}</div>

        <button class="login-btn" :disabled="jiazaiZhong" @click="denglu">
          {{ jiazaiZhong ? '登录中...' : '登录' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import http from '../axios/index'   
import { useRouter } from 'vue-router'

let router = useRouter()
let username = ref('')
let password = ref('')
let cuowuXinxi = ref('')
let jiazaiZhong = ref(false)
let mimaShuru = ref(null)
let tiaomima = ()=>{
    if(username.value.trim()===''){
        cuowuXinxi.value = '请输入账号'
        return
    }
    cuowuXinxi.value = ''
    mimaShuru.value?.focus()
}
let denglu = async ()=>{
    try {
        jiazaiZhong.value = true
        let res = await http.post('/api/login', {
            username: username.value,
            password: password.value
        })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('avatar', res.data.avatar || '')
        router.push('/')
    } catch (error) {
        cuowuXinxi.value = '账号或密码错误，请重新输入'
        console.error('登录失败:', error)
    } finally {
        jiazaiZhong.value = false
    }
}

</script>

<style scoped>
.login-wrapper {
  width: 100vw;
  height: 100vh;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.login-container {
  background: var(--card-bg);
  width: 380px;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  text-align: center;
  transition: background 0.3s, box-shadow 0.3s;
}

.login-title {
  font-size: 24px;
  color: var(--text-color);
  margin-bottom: 8px;
  transition: color 0.3s;
}

.login-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 35px;
  transition: color 0.3s;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.login-input {
  height: 44px;
  padding: 0 15px;
  border: 1px solid var(--input-border);
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  background: var(--input-bg);
  color: var(--text-color);
  transition: 0.3s;
}

.login-input:focus {
  border-color: var(--primary-color);
}

.error-tip {
  color: var(--danger-color);
  font-size: 12px;
  text-align: left;
}

.login-btn {
  height: 46px;
  background: var(--primary-color);
  color: var(--btn-text);
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  background: var(--primary-hover);
}

.login-btn:disabled {
  background: var(--primary-disabled);
  cursor: not-allowed;
}
</style>
