<template>
  <div class="gerenziliao-page">
    <div class="card">
      <div class="header-box">
        <div class="icon-box">
          <img v-if="formData.avatar" :src="avatarSrc" class="avatar-img" />
          <span v-else class="icon">👤</span>
        </div>
        <div class="header-info">
          <h3>个人资料</h3>
          <p>查看与修改个人信息</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="form-wrapper">
      <div class="avatar-section">
        <div class="avatar-box" @click="triggerUpload" title="点击更换头像">
          <img v-if="formData.avatar" :src="avatarSrc" class="avatar-preview" />
          <span v-else class="avatar-placeholder">👤</span>
          <div class="avatar-overlay">
            <span>📷</span>
          </div>
        </div>
        <input ref="fileInput" type="file" accept="image/*" class="file-hidden" @change="handleAvatarUpload" />
      </div>

      <div class="info-section">
        <div class="info-item">
          <label>用户名</label>
          <input v-model="formData.username" type="text" disabled class="info-input" />
        </div>
        <div class="info-item">
          <label>用户ID</label>
          <input :value="formData.userId" type="text" disabled class="info-input" />
        </div>
        <div class="info-item">
          <label>昵称</label>
          <input v-model="formData.nickname" type="text" placeholder="请输入昵称" class="info-input" />
        </div>
        <div class="info-item">
          <label>角色权限</label>
          <div class="val status-role">超级管理员</div>
        </div>
      </div>

      <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>
      <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <div class="btn-group">
        <button class="btn save-btn" @click="baocun">保存修改</button>
        <button class="btn back-btn" @click="router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../../fengzhuang/axios.ts'

const router = useRouter()
const fileInput = ref(null)
const successMsg = ref('')
const errorMsg = ref('')

const formData = reactive({
  userId: '',
  username: '',
  nickname: '',
  avatar: ''
})

const avatarSrc = computed(() => {
  if (!formData.avatar) return ''
  if (formData.avatar.startsWith('data:')) return formData.avatar
  if (formData.avatar.startsWith('http')) return formData.avatar
  return formData.avatar
})

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleAvatarUpload = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = async (ev) => {
    try {
      const res = await http.post('/api/upload-avatar', {
        base64: ev.target.result,
        userId: formData.userId
      })
      formData.avatar = res.data.url
      localStorage.setItem('avatar', res.data.url)
    } catch (err) {
      console.error('头像上传失败', err)
    }
  }
  reader.readAsDataURL(file)
}

const baocun = async () => {
  successMsg.value = ''
  errorMsg.value = ''
  try {
    await http.patch(`/yonghulist/${formData.userId}`, {
      avatar: formData.avatar,
      nickname: formData.nickname
    })
    successMsg.value = '保存成功'
    localStorage.setItem('avatar', formData.avatar || '')
  } catch (err) {
    errorMsg.value = '保存失败'
    console.error('保存失败', err)
  }
}

onMounted(async () => {
  formData.userId = localStorage.getItem('userId') || ''
  formData.username = localStorage.getItem('username') || ''
  formData.avatar = localStorage.getItem('avatar') || ''
  const uid = formData.userId
  if (uid && uid !== 'undefined' && uid !== 'null') {
    try {
      const res = await http.get('/yonghulist/' + uid)
      if (res.data) {
        formData.nickname = res.data.nickname || ''
        formData.username = res.data.yonghuming || formData.username
        if (res.data.avatar && !formData.avatar) {
          formData.avatar = res.data.avatar
        }
      }
    } catch (err) {
      console.error('获取用户信息失败:', err)
    }
  }
})
</script>

<style scoped>
.gerenziliao-page {
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
  overflow: hidden;
  flex-shrink: 0;
}
.icon-box .icon {
  font-size: 36px;
  color: #fff;
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.avatar-box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: var(--input-bg, #f5f5f5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-placeholder {
  font-size: 40px;
}
.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
  font-size: 24px;
}
.avatar-box:hover .avatar-overlay {
  opacity: 1;
}
.file-hidden {
  display: none;
}

.info-section {
  margin-bottom: 24px;
}
.info-item {
  margin-bottom: 18px;
}
.info-item label {
  display: block;
  font-size: 13px;
  color: var(--text-muted, #999);
  margin-bottom: 6px;
}
.info-input {
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--input-border, #ddd);
  border-radius: 10px;
  font-size: 14px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #222);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, background 0.3s, color 0.3s;
}
.info-input:focus {
  border-color: #07c160;
  box-shadow: 0 0 0 3px rgba(7, 193, 96, 0.1);
}
.info-input:disabled {
  background: var(--hover-bg, #fafafa);
  color: var(--text-muted, #999);
}

.val {
  height: 44px;
  line-height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  background: var(--hover-bg, #fafafa);
  font-size: 14px;
  color: var(--text-color, #222);
}
.status-role {
  color: #07c160;
  font-weight: 500;
}

.success-msg {
  color: #07c160;
  font-size: 14px;
  margin: 8px 0;
  text-align: center;
}
.error-msg {
  color: #f56c6c;
  font-size: 14px;
  margin: 8px 0;
  text-align: center;
}

.btn-group {
  margin-top: 24px;
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
