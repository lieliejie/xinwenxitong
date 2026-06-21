<template>
  <div class="profile-page">
    <div class="profile-card">
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
      
      <div class="avatar-section">
        <div class="avatar-box" @click="triggerUpload" title="点击更换头像">
          <img v-if="formData.avatar" :src="avatarSrc" class="avatar-img" />
          <span v-else class="avatar-text">👤</span>
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
      </div>

      <button class="save-btn" @click="baocun">保存修改</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import http from '../../../axios/index'

const router = useRouter()
const fileInput = ref(null)

const formData = reactive({
  userId: '',
  username: '',
  avatar: ''
})

const avatarSrc = computed(() => {
  if (!formData.avatar) return ''
  if (formData.avatar.startsWith('http') || formData.avatar.startsWith('/')) return formData.avatar
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
  try {
    await http.patch(`/yonghulist/${formData.userId}`, {
      avatar: formData.avatar
    })
    alert('保存成功')
  } catch (err) {
    console.error('保存失败', err)
  }
}

onMounted(() => {
  formData.userId = localStorage.getItem('userId') || ''
  formData.username = localStorage.getItem('username') || ''
  formData.avatar = localStorage.getItem('avatar') || ''
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.profile-card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 480px;
  position: relative;
  box-shadow: var(--shadow);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  color: var(--text-muted);
  cursor: pointer;
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.avatar-box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: var(--input-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-text {
  font-size: 40px;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
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
  color: var(--text-muted);
  margin-bottom: 6px;
}

.info-input {
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--input-border);
  border-radius: 10px;
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-color);
  outline: none;
}

.save-btn {
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 10px;
  background: var(--primary-color);
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
</style>
