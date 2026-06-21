<template>
  <div class="dialog-overlay" v-if="store.isAdd">
    <div class="dialog-box">
      <span class="close-btn" @click="guanbi">✕</span>

      <h3 class="dialog-title">新增新闻</h3>

      <div class="form-item">
        <label>新闻标题</label>
        <input v-model="form.biaoTi" type="text" placeholder="请输入标题" />
      </div>

      <div class="form-item">
        <label>分类</label>
        <select v-model="form.fenLei">
          <option value="" disabled selected hidden>请选择分类</option>
          <option v-for="item in store.categoryList" :key="item.id" :value="item.id">
            {{ item.mingCheng }}
          </option>
        </select>
      </div>

      <div class="form-item">
        <label>来源</label>
        <input v-model="form.laiYuan" type="text" placeholder="请输入来源" />
      </div>

      <div class="form-item">
        <label>图片</label>
        <input ref="tupiankuang" type="file" accept="image/*" @change="handleImageUpload" />
        <div v-if="form.tuPian.length" class="image-preview">
          <img v-for="(url, idx) in form.tuPian" :key="idx" :src="url" class="preview-img" />
        </div>
      </div>

      <div class="form-item">
        <label>发布日期</label>
        <input v-model="form.riQi" type="date" />
      </div>

      <div class="form-item">
        <label>简介</label>
        <textarea v-model="form.jianJie" placeholder="请输入简介" rows="3"></textarea>
      </div>

      <div class="form-item">
        <label>正文内容</label>
        <textarea v-model="form.neiRong" placeholder="请输入正文" rows="5"></textarea>
      </div>

      <div class="dialog-footer">
        <button class="btn-cancel" @click="guanbi">取消</button>
        <button class="btn-confirm" @click="tijiao">确认新增</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { http } from '../fengzhuang/axios'
import useStore from '../pinia'
import { nanoid } from 'nanoid'

const store = useStore()
const tupiankuang = ref(null)

const form = reactive({
  biaoTi: '',
  fenLei: '',
  laiYuan: '',
  tuPian: [],
  riQi: new Date().toISOString().split('T')[0],
  jianJie: '',
  neiRong: ''
})

const handleImageUpload = async () => {
  const file = tupiankuang.value?.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = async (e) => {
    try {
      const res = await http.post('/api/upload-tupian', { base64: e.target.result })
      form.tuPian.push(res.data.url)
    } catch (err) {
      console.error('图片上传失败', err)
    }
  }
  reader.readAsDataURL(file)
}

const guanbi = () => {
  store.isAdd = false
  form.biaoTi = ''
  form.fenLei = ''
  form.laiYuan = ''
  form.tuPian = []
  form.jianJie = ''
  form.neiRong = ''
}

const tijiao = async () => {
  if (!form.biaoTi.trim()) return alert('请输入标题')
  if (!form.fenLei) return alert('请选择分类')
  try {
    await http.post('/zhongzhuanshuju', {
      id: nanoid(10),
      biaoTi: form.biaoTi,
      fenLei: form.fenLei,
      laiYuan: form.laiYuan,
      tuPian: form.tuPian,
      riQi: form.riQi,
      jianJie: form.jianJie,
      neiRong: form.neiRong,
      yueduLiang: 0,
      isTop: false
    })
    alert('新增成功')
    guanbi()
    store.fetchData()
  } catch (err) {
    console.error('新增失败', err)
    alert('新增失败')
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-box {
  position: relative;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 22px;
  color: #999;
  cursor: pointer;
  user-select: none;
}
.close-btn:hover {
  color: #333;
}

.dialog-title {
  margin: 0 0 20px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.form-item {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.form-item label {
  margin-bottom: 6px;
  font-size: 14px;
  color: #555;
}

.form-item input[type="text"],
.form-item input[type="date"],
.form-item select,
.form-item textarea {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-item input:focus,
.form-item select:focus,
.form-item textarea:focus {
  border-color: #07c160;
}

.image-preview {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.preview-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #eee;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
}

.btn-cancel,
.btn-confirm {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #666;
}
.btn-cancel:hover {
  background-color: #e8e8e8;
}

.btn-confirm {
  background-color: #07c160;
  color: #fff;
}
.btn-confirm:hover {
  background-color: #06ad56;
}

.btn-confirm:disabled {
  background-color: #90e3a9;
  cursor: not-allowed;
}
</style>
