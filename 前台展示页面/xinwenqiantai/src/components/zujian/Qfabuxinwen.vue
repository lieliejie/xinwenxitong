<template>
  <div class="fabu-container">
    <div class="fabu-header">
      <button class="back-btn" @click="$router.back()">← 返回</button>
      <h2>发布新闻</h2>
      <div class="placeholder"></div>
    </div>

    <div class="fabu-form">
      <div class="form-item">
        <label>新闻标题 <span class="required">*</span></label>
        <input v-model="form.biaoTi" type="text" placeholder="请输入新闻标题" maxlength="100" />
      </div>

      <div class="form-item">
        <label>分类 <span class="required">*</span></label>
        <select v-model="form.fenLei">
          <option value="" disabled>请选择分类</option>
          <option value="minsheng">民生</option>
          <option value="caijing">财经</option>
          <option value="keji">科技</option>
          <option value="jiaoyu">教育</option>
          <option value="tiyu">体育</option>
          <option value="yule">娱乐</option>
          <option value="guoji">国际</option>
        </select>
      </div>

      <div class="form-item">
        <label>来源 <span class="required">*</span></label>
        <input v-model="form.laiYuan" type="text" placeholder="如：新华社、人民日报等" />
      </div>

      <div class="form-item">
        <label>日期 <span class="required">*</span></label>
        <input v-model="form.riQi" type="date" />
      </div>

      <div class="form-item">
        <label>新闻简介 <span class="required">*</span></label>
        <textarea v-model="form.jianJie" placeholder="请输入新闻简介，用于列表页展示" maxlength="200" rows="3"></textarea>
        <span class="count">{{ form.jianJie.length }}/200</span>
      </div>

      <div class="form-item">
        <label>正文内容 <span class="required">*</span></label>
        <textarea v-model="form.neiRong" placeholder="请输入新闻正文内容" rows="8"></textarea>
      </div>

      <div class="form-item">
        <label>封面图片</label>
        <div class="image-upload">
          <div v-for="(url, idx) in form.tuPian" :key="idx" class="image-item">
            <img :src="url" alt="封面图" />
            <button class="remove-img" @click="shanchuTupian(idx)">×</button>
          </div>
          <div class="add-image-box" v-if="form.tuPian.length < 3" @click="tupiankuang.click()">
            <input ref="tupiankuang" type="file" accept="image/*" class="file-input" @change="handleImageUpload" />
            <span class="add-icon">+</span>
            <span class="add-text">添加图片</span>
          </div>
        </div>
        <span class="tip">支持 jpg/png 格式，最多上传 3 张</span>
      </div>

      <div class="form-item switch-item">
        <label>置顶新闻</label>
        <label class="switch">
          <input type="checkbox" v-model="form.isTop" />
          <span class="slider"></span>
        </label>
      </div>

      <button class="submit-btn" :disabled="jiazaiZhong" @click="tijiao">
        {{ jiazaiZhong ? '发布中...' : '发布新闻' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import http from '../axios/index'
import { nanoid } from 'nanoid'

const router = useRouter()
const tupiankuang = ref(null)
const jiazaiZhong = ref(false)

const form = reactive({
  biaoTi: '',
  fenLei: '',
  laiYuan: '',
  riQi: new Date().toISOString().split('T')[0],
  jianJie: '',
  neiRong: '',
  tuPian: [],
  isTop: false
})

const handleImageUpload = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = async (ev) => {
    try {
      const res = await http.post('/api/upload-tupian', { base64: ev.target.result })
      form.tuPian.push(res.data.url)
    } catch (err) {
      console.error('图片上传失败', err)
    }
  }
  reader.readAsDataURL(file)
}

const shanchuTupian = (idx) => {
  form.tuPian.splice(idx, 1)
}

const tijiao = async () => {
  if (!form.biaoTi.trim()) return alert('请输入标题')
  if (!form.fenLei) return alert('请选择分类')
  if (!form.laiYuan.trim()) return alert('请输入来源')
  if (!form.neiRong.trim()) return alert('请输入正文')
  jiazaiZhong.value = true
  try {
    await http.post('/zhongzhuanshuju', {
      id: nanoid(10),
      biaoTi: form.biaoTi,
      fenLei: form.fenLei,
      laiYuan: form.laiYuan,
      riQi: form.riQi,
      jianJie: form.jianJie,
      neiRong: form.neiRong,
      tuPian: form.tuPian,
      yueduLiang: 0,
      isTop: form.isTop
    })
    alert('提交成功，等待审核')
    router.push('/')
  } catch (err) {
    console.error('发布失败', err)
    alert('发布失败')
  } finally {
    jiazaiZhong.value = false
  }
}
</script>

<style scoped>
.fabu-container {
  min-height: 100vh;
  background: #f5f6fa;
}

.fabu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.back-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #2d7df6;
  cursor: pointer;
  padding: 4px 0;
}

.fabu-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
}

.placeholder {
  width: 50px;
}

.fabu-form {
  max-width: 680px;
  margin: 20px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.form-item {
  margin-bottom: 22px;
}

.form-item label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.required {
  color: #e74c3c;
}

.form-item input[type="text"],
.form-item input[type="date"],
.form-item select,
.form-item textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #dcdde1;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #fafbfc;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  font-family: inherit;
}

.form-item input:focus,
.form-item select:focus,
.form-item textarea:focus {
  border-color: #2d7df6;
  box-shadow: 0 0 0 3px rgba(45,125,246,0.1);
  background: #fff;
}

.form-item textarea {
  resize: vertical;
}

.count {
  display: block;
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.image-upload {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-start;
}

.image-item {
  position: relative;
  width: 120px;
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-img {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.add-image-box {
  width: 120px;
  height: 90px;
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s;
}

.add-image-box:hover {
  border-color: #2d7df6;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.add-icon {
  font-size: 28px;
  color: #bbb;
}

.add-text {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.tip {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

.switch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.switch {
  position: relative;
  width: 48px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: #ccc;
  border-radius: 26px;
  cursor: pointer;
  transition: background 0.3s;
}

.slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  left: 3px;
  bottom: 3px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
}

.switch input:checked + .slider {
  background: #2d7df6;
}

.switch input:checked + .slider::before {
  transform: translateX(22px);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: #2d7df6;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: #1a6ae0;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
