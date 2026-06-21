<template>
  <div class="boxiang-page">
    <div class="card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">📋</span>
        </div>
        <div class="header-info">
          <h3>驳回详情</h3>
          <p>查看驳回原因，编辑后重新提交</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="form-wrapper">
      <div class="section-title">✏️ 稿件编辑</div>

      <div class="form-group">
        <label class="form-label">稿件标题</label>
        <input type="text" class="form-input" placeholder="请输入稿件标题" v-model="formData.biaoTi" />
      </div>

      <div class="form-group">
        <label class="form-label">所属分类</label>
        <select class="form-input" v-model="formData.fenLei">
          <option value="">请选择分类</option>
          <option v-for="item in categoryOptions" :key="item.id" :value="item.id">{{ item.mingcheng }}</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">封面图片（最多3张）</label>
        <div class="cover-upload">
          <div class="cover-preview" v-for="(img, idx) in formData.tuPian" :key="idx">
            <img :src="img" alt="封面" />
            <span class="cover-remove" @click="removeCover(idx)">✕</span>
          </div>
          <label class="cover-placeholder" v-if="formData.tuPian.length < 3">
            <span class="upload-icon">📷</span>
            <span>点击上传封面</span>
            <input type="file" accept="image/*" class="file-hidden" @change="handleCoverUpload" />
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">来源</label>
        <input type="text" class="form-input" placeholder="请输入来源" v-model="formData.laiYuan" />
      </div>

      <div class="form-group">
        <label class="form-label">发布日期</label>
        <input type="date" class="form-input" v-model="formData.riQi" />
      </div>

      <div class="form-group">
        <label class="form-label">简介</label>
        <textarea class="form-textarea" placeholder="请输入简介" v-model="formData.jianJie" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">正文内容</label>
        <textarea class="form-textarea" placeholder="请输入正文" v-model="formData.neiRong" rows="6"></textarea>
      </div>
    </div>

    <div class="action-bar">
      <button class="action-btn publish-btn" @click="chongxintijiao">重新提交</button>
      <button class="action-btn save-btn" @click="baocuncaogao">保存草稿</button>
      <button class="action-btn delete-btn" @click="shanchu">删除</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import http from '../../../axios/index'

const router = useRouter()
const route = useRoute()

const formData = reactive({
  id: '',
  biaoTi: '',
  fenLei: '',
  tuPian: [],
  laiYuan: '',
  riQi: '',
  jianJie: '',
  neiRong: ''
})

const categoryOptions = ref([
  { id: 'minsheng', mingcheng: '民生' },
  { id: 'caijing', mingcheng: '财经' },
  { id: 'keji', mingcheng: '科技' },
  { id: 'jiaoyu', mingcheng: '教育' },
  { id: 'tiyu', mingcheng: '体育' },
  { id: 'yule', mingcheng: '娱乐' },
  { id: 'guoji', mingcheng: '国际' }
])

const handleCoverUpload = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = async (ev) => {
    try {
      const res = await http.post('/api/upload-tupian', { base64: ev.target.result })
      formData.tuPian.push(res.data.url)
    } catch (err) {
      console.error('图片上传失败', err)
    }
  }
  reader.readAsDataURL(file)
}

const removeCover = (idx) => {
  formData.tuPian.splice(idx, 1)
}

const chongxintijiao = async () => {
  if (!formData.biaoTi.trim()) return alert('请输入标题')
  try {
    await http.post('/zhongzhuanshuju', {
      biaoTi: formData.biaoTi,
      fenLei: formData.fenLei,
      tuPian: formData.tuPian,
      laiYuan: formData.laiYuan,
      riQi: formData.riQi || new Date().toISOString().split('T')[0],
      jianJie: formData.jianJie,
      neiRong: formData.neiRong,
      yueduLiang: 0
    })
    if (formData.id) {
      await http.delete(`/bohuishuju/${formData.id}`)
    }
    alert('重新提交成功')
    router.back()
  } catch (err) {
    console.error('提交失败', err)
  }
}

const baocuncaogao = () => {
  alert('草稿已保存')
}

const shanchu = async () => {
  if (!confirm('确定删除？')) return
  try {
    if (formData.id) {
      await http.delete(`/bohuishuju/${formData.id}`)
    }
    router.back()
  } catch (err) {
    console.error('删除失败', err)
  }
}

onMounted(async () => {
  const id = route.params.id
  if (!id) return
  try {
    const res = await http.get(`/bohuishuju/${id}`)
    const data = res.data
    Object.assign(formData, {
      id: data.id,
      biaoTi: data.biaoTi || '',
      fenLei: data.fenLei || '',
      tuPian: data.tuPian || [],
      laiYuan: data.laiYuan || '',
      riQi: data.riQi || '',
      jianJie: data.jianJie || '',
      neiRong: data.neiRong || ''
    })
  } catch (err) {
    console.error('获取驳回详情失败', err)
  }
})
</script>

<style scoped>
.boxiang-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding: 20px;
}

.card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow);
}

.header-box {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(224,72,72,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 24px;
}

.header-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
}

.header-info p {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 4px;
}

.close-btn {
  font-size: 20px;
  color: var(--text-muted);
  cursor: pointer;
}

.form-wrapper {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 28px 40px;
  box-shadow: var(--shadow);
  margin-bottom: 24px;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 22px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 1px solid var(--input-border);
  border-radius: 10px;
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-color);
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(7, 193, 96, 0.1);
}

select.form-input {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23999' d='M1.41 0L6 4.58 10.59 0 12 1.41l-6 6-6-6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

.form-textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--input-border);
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.8;
  background: var(--input-bg);
  color: var(--text-color);
  outline: none;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
}

.form-textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(7, 193, 96, 0.1);
}

.cover-upload {
  display: flex;
  gap: 16px;
}

.cover-preview {
  position: relative;
  width: 200px;
  height: 130px;
  border-radius: 10px;
  overflow: hidden;
}

.cover-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-remove {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
}

.cover-placeholder {
  width: 200px;
  height: 130px;
  border: 2px dashed var(--input-border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 13px;
}

.cover-placeholder:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.upload-icon {
  font-size: 28px;
}

.file-hidden {
  display: none;
}

.action-bar {
  display: flex;
  gap: 16px;
  padding: 0 0 40px;
}

.action-btn {
  flex: 1;
  height: 52px;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.25s;
}

.action-btn:hover {
  transform: translateY(-2px);
}

.publish-btn {
  background: var(--primary-gradient);
  color: var(--btn-text);
  box-shadow: 0 4px 15px rgba(7, 193, 96, 0.3);
}

.save-btn {
  background: var(--btn-gray);
  color: var(--btn-gray-text);
  border: 1px solid var(--input-border);
}

.delete-btn {
  background: rgba(224, 72, 72, 0.08);
  color: var(--danger-color);
  border: 1px solid rgba(224, 72, 72, 0.2);
}

.delete-btn:hover {
  background: rgba(224, 72, 72, 0.15);
}
</style>
