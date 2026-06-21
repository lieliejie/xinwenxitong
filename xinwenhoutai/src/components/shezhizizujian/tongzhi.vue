<template>
  <div class="tongzhi-page">
    <div class="card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">🔔</span>
        </div>
        <div class="header-info">
          <h3>消息通知</h3>
          <p>查看驳回通知，点击可编辑后重新提交</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="form-wrapper history-wrapper">
      <div class="section-title">📋 最近通知记录</div>
      <div class="history-list">
        <div class="history-item" v-for="item in store.rejectedList" :key="item.id" @click="goDetail(item)">
          <div class="history-left">
            <div class="history-info">
              <span class="history-title">{{ item.biaoTi }}</span>
              <span class="history-time">{{ item.time || item.riQi }}</span>
            </div>
          </div>
          <span class="history-status-text">驳回</span>
        </div>
        <div v-if="!store.rejectedList || store.rejectedList.length === 0" class="empty-tip">
          暂无通知记录
        </div>
      </div>
    </div>

    <!-- 驳回详情弹窗 -->
    <div class="detail-modal" v-if="showDetail">
      <div class="detail-box">
        <div class="detail-header">
          <h3>📋 驳回详情</h3>
          <span class="detail-close" @click="showDetail = false">✕</span>
        </div>
        <div class="detail-body">
          <div class="form-group">
            <label>稿件标题</label>
            <input type="text" class="form-input" placeholder="请输入稿件标题" v-model="editForm.biaoTi" />
          </div>
          <div class="form-group">
            <label>所属分类</label>
            <select class="form-input" v-model="editForm.fenLei">
              <option value="">请选择分类</option>
              <option v-for="item in categoryOptions" :key="item.id" :value="item.id">{{ item.mingcheng }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>来源</label>
            <input type="text" class="form-input" placeholder="请输入来源" v-model="editForm.laiYuan" />
          </div>
          <div class="form-group">
            <label>发布日期</label>
            <input type="date" class="form-input" v-model="editForm.riQi" />
          </div>
          <div class="form-group">
            <label>简介</label>
            <textarea class="form-textarea" placeholder="请输入简介" v-model="editForm.jianJie" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>正文内容</label>
            <textarea class="form-textarea" placeholder="请输入正文" v-model="editForm.neiRong" rows="6"></textarea>
          </div>
        </div>
        <div class="detail-actions">
          <button class="action-btn publish-btn" @click="chongxintijiao">重新提交</button>
          <button class="action-btn delete-btn" @click="shanchu">删除</button>
          <button class="action-btn cancel-btn" @click="showDetail = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '../pinia/index.ts'
import { http } from '../fengzhuang/axios.ts'

let router = useRouter()
let store = useStore()

const showDetail = ref(false)
const currentItem = ref(null)

const editForm = reactive({
  id: '',
  biaoTi: '',
  fenLei: '',
  laiYuan: '',
  riQi: '',
  jianJie: '',
  neiRong: ''
})

const categoryOptions = ref([
  { id: 'shizheng', mingcheng: '时政' },
  { id: 'minsheng', mingcheng: '民生' },
  { id: 'bendi', mingcheng: '本地' },
  { id: 'caijing', mingcheng: '财经' },
  { id: 'jinri', mingcheng: '今日' },
  { id: 'keji', mingcheng: '科技' },
  { id: 'jiaoyu', mingcheng: '教育' },
  { id: 'tiyu', mingcheng: '体育' },
  { id: 'yule', mingcheng: '娱乐' },
  { id: 'guoji', mingcheng: '国际' }
])

const goDetail = (item) => {
  currentItem.value = item
  Object.assign(editForm, {
    id: item.id || '',
    biaoTi: item.biaoTi || '',
    fenLei: item.fenLei || '',
    laiYuan: item.laiYuan || '',
    riQi: item.riQi || '',
    jianJie: item.jianJie || '',
    neiRong: item.neiRong || ''
  })
  showDetail.value = true
}

const chongxintijiao = async () => {
  if (!editForm.biaoTi.trim()) return alert('请输入标题')
  try {
    await http.post('/zhongzhuandataList', {
      biaoTi: editForm.biaoTi,
      fenLei: editForm.fenLei,
      laiYuan: editForm.laiYuan,
      riQi: editForm.riQi || new Date().toISOString().split('T')[0],
      jianJie: editForm.jianJie,
      neiRong: editForm.neiRong,
      yueduLiang: 0
    })
    if (editForm.id) {
      await http.delete(`/rejectedList/${editForm.id}`)
    }
    showDetail.value = false
    alert('重新提交成功')
    // 刷新数据
    try {
      let res = await http.get('/rejectedList')
      store.rejectedList = res.data || []
    } catch (err) { console.error(err) }
  } catch (err) {
    console.error('提交失败', err)
    alert('提交失败')
  }
}

const shanchu = async () => {
  if (!confirm('确定删除？')) return
  try {
    if (editForm.id) {
      await http.delete(`/rejectedList/${editForm.id}`)
    }
    showDetail.value = false
    try {
      let res = await http.get('/rejectedList')
      store.rejectedList = res.data || []
    } catch (err) { console.error(err) }
  } catch (err) {
    console.error('删除失败', err)
  }
}
</script>

<style scoped>
.tongzhi-page {
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
  background: linear-gradient(135deg, #fa8c16, #ffa940);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-box .icon {
  font-size: 36px;
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
  margin-bottom: 24px;
  transition: background 0.3s, box-shadow 0.3s;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color, #121212);
  margin-bottom: 6px;
  transition: color 0.3s;
}

.history-wrapper {
  padding-bottom: 28px;
}

.history-list {
  margin-top: 16px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color, #f2f2f2);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s, padding-left 0.3s;
}
.history-item:hover {
  background: var(--hover-bg, #fafafa);
  padding-left: 8px;
}
.history-item:last-child {
  border-bottom: none;
}

.history-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.history-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.history-title {
  font-size: 15px;
  color: var(--text-color, #121212);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s;
}
.history-time {
  font-size: 12px;
  color: var(--text-muted, #999);
  transition: color 0.3s;
}

.history-status-text {
  font-size: 15px;
  color: red;
  flex-shrink: 0;
  margin-left: 12px;
}

.empty-tip {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted, #999);
  font-size: 14px;
}

/* 详情弹窗 */
.detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}
.detail-box {
  background: var(--card-bg, #fff);
  border-radius: 20px;
  width: 100%;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px 16px;
  border-bottom: 1px solid var(--border-color, #f2f2f2);
}
.detail-header h3 {
  font-size: 18px;
  color: var(--text-color, #121212);
  margin: 0;
}
.detail-close {
  font-size: 20px;
  cursor: pointer;
  color: var(--text-muted, #999);
}
.detail-close:hover {
  color: var(--text-color, #333);
}
.detail-body {
  padding: 24px 28px;
}
.form-group {
  margin-bottom: 18px;
}
.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color, #222);
  margin-bottom: 8px;
}
.form-input {
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 1px solid var(--input-border, #ddd);
  border-radius: 10px;
  font-size: 14px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #222);
  outline: none;
  box-sizing: border-box;
}
.form-input:focus {
  border-color: #07c160;
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
  border: 1px solid var(--input-border, #ddd);
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.8;
  background: var(--input-bg, #fff);
  color: var(--text-color, #222);
  outline: none;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
}
.form-textarea:focus {
  border-color: #07c160;
  box-shadow: 0 0 0 3px rgba(7, 193, 96, 0.1);
}
.detail-actions {
  display: flex;
  gap: 12px;
  padding: 20px 28px 28px;
}
.action-btn {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.action-btn:hover {
  transform: translateY(-2px);
}
.publish-btn {
  background: linear-gradient(135deg, #07c160, #06b057);
  color: #fff;
  box-shadow: 0 4px 15px rgba(7, 193, 96, 0.3);
}
.delete-btn {
  background: rgba(224, 72, 72, 0.08);
  color: #e04848;
  border: 1px solid rgba(224, 72, 72, 0.2);
}
.delete-btn:hover {
  background: rgba(224, 72, 72, 0.15);
}
.cancel-btn {
  background: var(--btn-gray, #f2f2f2);
  color: var(--btn-gray-text, #666);
}
</style>
