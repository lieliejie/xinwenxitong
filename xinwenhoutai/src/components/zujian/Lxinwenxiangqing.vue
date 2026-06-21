<template>
  <div class="detail-wrapper">
    <!-- 加载中 -->
    <div v-if="loading" class="detail-loading">
      <div class="loading-spinner"></div>
      <span>正在加载新闻详情...</span>
    </div>

    <!-- 加载失败 -->
    <div v-else-if="loadError" class="detail-error">
      <span>⚠️ {{ errorMsg }}</span>
      <div class="error-actions">
        <button class="retry-btn" @click="fetchDetail">重试</button>
        <button class="back-btn" @click="goBack">返回</button>
      </div>
    </div>

    <!-- 正常数据 -->
    <div v-else class="detail-container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span class="breadcrumb-item" @click="goBack">数据统计</span>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">新闻详情</span>
      </div>

      <!-- 新闻标题区 -->
      <div class="detail-header">
        <h1 class="detail-title">{{ news.biaoTi }}</h1>
        <div class="detail-meta">
          <span class="meta-tag" :class="'tag-' + (news.fenLei || 'default')">
            {{ categoryName }}
          </span>
          <span class="meta-item">📝 来源：{{ news.laiYuan }}</span>
          <span class="meta-item">🕐 日期：{{ news.riQi }}</span>
          <span class="meta-item">👁️ 阅读量：{{ (news.yueduLiang || 0).toLocaleString() }}</span>
        </div>
      </div>

      <!-- 新闻摘要 -->
      <div v-if="news.jianJie" class="detail-summary">
        <div class="summary-label">摘要</div>
        <p class="summary-text">{{ news.jianJie }}</p>
      </div>

      <!-- 新闻图片 -->
      <div v-if="news.tuPian && news.tuPian.length > 0" class="detail-images">
        <div class="images-label">新闻图片</div>
        <div class="images-grid">
          <img
            v-for="(img, idx) in news.tuPian"
            :key="idx"
            :src="img"
            :alt="'图片' + (idx + 1)"
            class="detail-img"
            @click="previewImage(img)"
            loading="lazy"
          />
        </div>
      </div>

      <!-- 新闻正文 -->
      <div class="detail-content">
        <div class="content-label">正文内容</div>
        <div class="content-text">{{ news.neiRong }}</div>
      </div>

      <!-- 底部操作 -->
      <div class="detail-footer">
        <button class="footer-btn back" @click="goBack">← 返回列表</button>
      </div>

      <!-- 图片预览遮罩 -->
      <div v-if="previewVisible" class="preview-overlay" @click="previewVisible = false">
        <img :src="previewSrc" class="preview-img" @click.stop />
        <span class="preview-close" @click="previewVisible = false">✕</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { http } from '../fengzhuang/axios.ts'

const route = useRoute()
const router = useRouter()

const newsId = computed(() => route.params.id)

const news = reactive({
  biaoTi: '',
  fenLei: '',
  laiYuan: '',
  riQi: '',
  jianJie: '',
  neiRong: '',
  tuPian: [],
  yueduLiang: 0
})

const loading = ref(true)
const loadError = ref(false)
const errorMsg = ref('数据加载失败')

// 图片预览
const previewVisible = ref(false)
const previewSrc = ref('')

// 分类名称映射
const categoryMap = {
  minsheng: '民生',
  caijing: '财经',
  bendi: '本地',
  shizheng: '时政',
  keji: '科技',
  jiaoyu: '教育',
  yiliao: '医疗'
}
const categoryName = computed(() => categoryMap[news.fenLei] || news.fenLei || '综合')

const previewImage = (src) => {
  previewSrc.value = src
  previewVisible.value = true
}

const goBack = () => {
  router.push('/tongji')
}

const fetchDetail = async () => {
  loading.value = true
  loadError.value = false
  try {
    const id = String(newsId.value || '')
    if (!id) {
      loadError.value = true
      errorMsg.value = '缺少新闻标识符，无法加载详情'
      return
    }
    const res = await http.get('/api/news-detail', { params: { id } })
    if (res.data && res.data.code === 200) {
      const d = res.data.data
      news.biaoTi = d.biaoTi || ''
      news.fenLei = d.fenLei || ''
      news.laiYuan = d.laiYuan || ''
      news.riQi = d.riQi || ''
      news.jianJie = d.jianJie || ''
      news.neiRong = d.neiRong || ''
      news.tuPian = Array.isArray(d.tuPian) ? d.tuPian : []
      news.yueduLiang = d.yueduLiang || 0
    } else if (res.data && res.data.code === 404) {
      loadError.value = true
      errorMsg.value = '新闻不存在或已被删除'
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('获取新闻详情失败:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

watch(newsId, (newId) => {
  if (newId) {
    fetchDetail()
  }
})

onMounted(() => {
  if (!newsId.value) {
    loadError.value = true
    errorMsg.value = '缺少新闻标识符，无法加载详情'
    loading.value = false
    return
  }
  fetchDetail()
})
</script>

<style scoped>
.detail-wrapper {
  padding: 20px;
  min-height: 100%;
  background-color: #fafafa;
}

/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
  font-size: 14px;
  color: #999;
}
.breadcrumb-item {
  color: #07c160;
  cursor: pointer;
}
.breadcrumb-item:hover {
  text-decoration: underline;
}
.breadcrumb-sep {
  margin: 0 8px;
  color: #ccc;
}
.breadcrumb-current {
  color: #333;
}

/* 加载中 */
.detail-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: #999;
  font-size: 14px;
  gap: 16px;
}
.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #f0f0f0;
  border-top-color: #07c160;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 错误提示 */
.detail-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 60px 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  color: #999;
  font-size: 14px;
}
.error-actions {
  display: flex;
  gap: 12px;
}
.retry-btn, .back-btn {
  padding: 6px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}
.retry-btn {
  background: #07c160;
  color: #fff;
}
.retry-btn:hover {
  background: #06ad56;
}
.back-btn {
  background: #f0f0f0;
  color: #666;
}
.back-btn:hover {
  background: #e0e0e0;
}

/* 详情容器 */
.detail-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 30px;
}

/* 标题区 */
.detail-header {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}
.detail-title {
  font-size: 24px;
  font-weight: 700;
  color: #222;
  line-height: 1.5;
  margin: 0 0 16px 0;
}
.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}
.meta-tag {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
}
.tag-minsheng { background: #07c160; }
.tag-caijing { background: #2196f3; }
.tag-bendi { background: #ff9800; }
.tag-shizheng { background: #e74c3c; }
.tag-keji { background: #9b59b6; }
.tag-jiaoyu { background: #1abc9c; }
.tag-yiliao { background: #e91e63; }
.tag-default { background: #999; }
.meta-item {
  font-size: 13px;
  color: #666;
}

/* 摘要 */
.detail-summary {
  background: #f8faf9;
  border-left: 4px solid #07c160;
  padding: 16px 20px;
  margin-bottom: 24px;
  border-radius: 0 4px 4px 0;
}
.summary-label {
  font-size: 14px;
  font-weight: 600;
  color: #07c160;
  margin-bottom: 8px;
}
.summary-text {
  font-size: 14px;
  color: #555;
  line-height: 1.8;
  margin: 0;
}

/* 图片区 */
.detail-images {
  margin-bottom: 24px;
}
.images-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}
.images-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.detail-img {
  width: 280px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}
.detail-img:hover {
  transform: scale(1.03);
}

/* 正文 */
.detail-content {
  margin-bottom: 24px;
}
.content-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}
.content-text {
  font-size: 15px;
  color: #333;
  line-height: 2;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 底部 */
.detail-footer {
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
}
.footer-btn {
  padding: 10px 32px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}
.footer-btn.back {
  background: #f5f5f5;
  color: #666;
}
.footer-btn.back:hover {
  background: #e8e8e8;
}

/* 图片预览遮罩 */
.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.preview-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 4px;
}
.preview-close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transition: background 0.2s;
}
.preview-close:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
