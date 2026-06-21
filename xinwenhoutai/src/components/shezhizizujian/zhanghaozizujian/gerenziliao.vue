<template>
  <div class="profile-page">
    <div class="profile-card">
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
      <!-- 头像区 -->
      <div class="avatar-section">
        <div class="avatar-box" @click="triggerUpload" title="点击更换头像">
          <img v-if="formData.avatar" :src="avatarSrc" class="avatar-img" />
          <span v-else class="avatar-text">👤</span>
          <div class="avatar-overlay">
            <span>📷</span>
          </div>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="file-hidden"
          @change="handleAvatarChange"
        />
        <div class="user-info">
          <h2 class="nickname">{{ formData.nickname || '未设置昵称' }}</h2>
          <p class="uid">ID：{{ userId || '未登录' }}</p>
        </div>
      </div>

      <!-- 表单区 -->
      <div class="form-section">
        <div class="form-item">
          <label>账号</label>
          <input v-model="formData.username" disabled class="form-input disabled-input" />
        </div>
        <div class="form-item">
          <label>昵称</label>
          <input v-model="formData.nickname" placeholder="请输入昵称" class="form-input" />
        </div>
        <div class="form-item">
          <label>手机号</label>
          <input v-model="formData.phone" placeholder="请输入手机号" class="form-input" />
        </div>
        <div class="form-item">
          <label>邮箱</label>
          <input v-model="formData.email" placeholder="请输入邮箱" class="form-input" />
        </div>
        <div class="form-item">
          <label>性别</label>
          <div class="radio-group">
            <label class="radio-item">
              <input type="radio" v-model="formData.gender" value="male" />
              <span>男</span>
            </label>
            <label class="radio-item">
              <input type="radio" v-model="formData.gender" value="female" />
              <span>女</span>
            </label>
          </div>
        </div>
        <div class="form-item">
          <label>个人简介</label>
          <textarea v-model="formData.bio" placeholder="介绍一下自己吧..." class="form-textarea" rows="3"></textarea>
        </div>

        <div class="btn-group">
          <button class="save-btn" :disabled="saving" @click="saveProfile">
            {{ saving ? '保存中...' : '保存修改' }}
          </button>
          <button class="cancel-btn" @click="cancelEdit">取消</button>
          <button class="back-btn" @click="goBack">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { http } from '../../fengzhuang/axios.ts'

const router = useRouter()

// 从localStorage取用户ID，没有则提示未登录
const rawId = localStorage.getItem('userId')
const userId = ref(rawId && rawId !== 'undefined' && rawId !== 'null' ? rawId : '')
const saving = ref(false)

// 头像 src：base64 直接显示，短路径自动拼完整 URL
const avatarSrc = computed(() => {
  if (!formData.avatar) return ''
  if (formData.avatar.startsWith('data:')) return formData.avatar
  if (formData.avatar.startsWith('http')) return formData.avatar
  return formData.avatar
})

const fileInput = ref()
// formData 是一个"容器"，用来存 onMounted 从后端拿回来的数据，然后显示在页面上。
const formData = reactive({
  username: localStorage.getItem('username') || '',
  nickname: '',
  phone: '',
  email: '',
  gender: 'male',
  bio: '',
  avatar: ''
})

// 备份初始数据，取消时直接恢复，不重复请求
const backupData = ref({})

// 点击头像触发文件选择
const triggerUpload = () => {
  fileInput.value?.click()
}

// 选中图片后先上传到后端，拿到路径再预览
const handleAvatarChange = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    alert('图片不能超过 2MB')
    return
  }
  // 先转 base64 用于上传
  const reader = new FileReader()
  reader.onload = async (event) => {
    const base64 = event.target.result
    try {
      const res = await http.post('/api/upload-avatar', {
        base64,
        userId: userId.value
      })
      // 后端返回图片路径，存起来
      formData.avatar = res.data.url
      console.log('上传成功')
    } catch (err) {
      console.error('头像上传失败:', err)
      alert('头像上传失败')
    }
  }
  reader.readAsDataURL(file)
}

// ========== 页面加载：从后端获取当前用户的个人资料 ==========
onMounted(async () => {
  if (!userId.value) {
    console.warn('未登录，无法获取个人资料')
    return
  }
  try {
    let res = await http.get('/yonghulist/' + userId.value)
    if (res.data) {
      formData.nickname = res.data.nickname || res.data.yonghuming || ''
      formData.phone = res.data.phone || ''
      formData.email = res.data.email || ''
      formData.gender = res.data.gender || 'male'
      formData.bio = res.data.bio || ''
      formData.avatar = res.data.avatar || ''
      // 存一份原始数据备份
      backupData.value = { ...formData }
    }
  } catch (err) {
    console.error('获取个人资料失败:', err)
  }
})

// ========== 保存：用 PUT /yonghulist/:id 覆盖更新用户数据 ==========
const saveProfile = async () => {
  if (saving.value) return
  if (!userId.value) {
    alert('请先登录')
    return
  }
  saving.value = true
  try {
    // json-server 的 PUT 会整条覆盖，所以要先获取原有数据再合并
    const old = await http.get('/yonghulist/' + userId.value)
    await http.put('/yonghulist/' + userId.value, {
      ...old.data,
      nickname: formData.nickname,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,
      bio: formData.bio,
      avatar: formData.avatar
    })
    alert('保存成功！')
  } catch (err) {
    console.error('保存失败:', err)
    alert('保存失败，请稍后重试')
  } finally {
    saving.value = false
  }
}

const cancelEdit = () => {
  Object.assign(formData, backupData.value)
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  padding: 25px 20px;
  background: var(--bg-color, #f5f7fa);
}

.profile-card {
  background: var(--card-bg, #fff);
  border-radius: 20px;
  padding: 32px 40px;
  box-shadow: var(--shadow, 0 4px 15px rgba(0, 0, 0, 0.04));
  position: relative;
  max-width: 700px;
  margin: 0 auto;
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

.avatar-section {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--border-color, #eee);
  margin-bottom: 30px;
}

.avatar-box {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #07c160, #06b057);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-text {
  font-size: 44px;
  color: #fff;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  opacity: 0;
  transition: opacity 0.25s;
}

.avatar-box:hover .avatar-overlay {
  opacity: 1;
}

.file-hidden {
  display: none;
}

.nickname {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color, #121212);
  margin: 0 0 6px 0;
}

.uid {
  font-size: 14px;
  color: var(--text-secondary, #888);
  margin: 0;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.form-item label {
  width: 90px;
  line-height: 44px;
  font-size: 15px;
  color: var(--text-secondary, #888);
  flex-shrink: 0;
  text-align: right;
}

.form-input {
  flex: 1;
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--input-border, #ddd);
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  background: var(--input-bg, #fff);
  color: var(--text-color, #121212);
  transition: border-color 0.2s, background 0.3s, color 0.3s;
}

.form-input:focus {
  border-color: var(--primary-color, #07c160);
}

.disabled-input {
  background: var(--bg-color, #f5f7fa);
  color: var(--text-secondary, #888);
  cursor: not-allowed;
}

.form-textarea {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid var(--input-border, #ddd);
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  background: var(--input-bg, #fff);
  color: var(--text-color, #121212);
  transition: border-color 0.2s, background 0.3s, color 0.3s;
}

.form-textarea:focus {
  border-color: #07c160;
}

.radio-group {
  display: flex;
  gap: 30px;
  height: 44px;
  align-items: center;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 15px;
  color: var(--text-color, #121212);
  transition: color 0.3s;
}

.radio-item input[type="radio"] {
  accent-color: var(--primary-color, #07c160);
}

.btn-group {
  display: flex;
  gap: 14px;
  margin-top: 10px;
  padding-left: 110px;
}

.save-btn {
  height: 44px;
  width: 140px;
  background: var(--primary-color, #07c160);
  color: var(--btn-text, #fff);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.save-btn:hover {
  background: var(--primary-hover, #06b057);
}

.save-btn:disabled {
  background: var(--primary-disabled, #a0e0c0);
  cursor: not-allowed;
}

.cancel-btn,
.back-btn {
  height: 44px;
  width: 100px;
  background: var(--btn-gray, #f2f2f2);
  color: var(--btn-gray-text, #666);
  border: 1px solid var(--input-border, #ddd);
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover,
.back-btn:hover {
  background: var(--btn-gray, #f2f2f2);
}
</style>
