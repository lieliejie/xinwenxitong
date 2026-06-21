<template>
  <div class="pindao-page">
    
    <Qdaohang />

    
    <div class="page-header">
      <div class="header-inner">
        <div class="header-info">
          <span class="header-label">热点</span>
          <h2 class="header-title">精选热点资讯</h2>
          <p class="header-desc">为你筛选最有价值的内容</p>
        </div>
        <div class="header-stats">
          <div class="stat-box">
            <span class="stat-val">{{ 12 }}</span>
            <span class="stat-label">篇精选</span>
          </div>
          <div class="stat-box">
            <span class="stat-val">{{213}}</span>
            <span class="stat-label">热议度</span>
          </div>
        </div>
      </div>
    </div>


    
    <div class="grid-container">
      <div 
        class="grid-card" 
        v-for="item in shaixuan" 
        :key="item.id"
        @click="store.increaseReadCount(item)"
      >
        <div class="grid-img">
          <img :src="item.tuPian[0]" alt="">
        </div>
        <div class="grid-body">
          <h4 class="grid-title">{{ store.truncateTitle(item) }}</h4>
          <p class="grid-desc">{{ item.jianJie }}</p>
          <div class="grid-meta">
            <span class="grid-source">{{ zhuanhuanmingcheng(item) }}</span>
            <span class="grid-time">{{ store.formatTime(item.riQi) }}</span>
            <span class="grid-read">{{ item.yueduLiang }}阅读</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed,ref,watch } from 'vue'
import Qdaohang from './Qdaohang.vue'
import useStore from '../pina/index.ts'
let store = useStore()

let fenleiliebiao = ref([
  {'mingcheng':'民生',id:'minsheng'},
  {'mingcheng':'财经',id:'caijing'},
  {'mingcheng':'时政',id:'shizheng'},
  {'mingcheng':'本地',id:'bendi'}
])

let zhuanhuanmingcheng = (item) => {
  const result = fenleiliebiao.value.find(fenlei => fenlei.id === item.fenLei)
  return result ? result.mingcheng : '未知'
}


watch(() => store.searchKeyword, (newVal) => {
  if (!newVal.trim()) {
    store.searchKeyword = ''
  }
})


let shaixuan = computed(()=>{
    let kaobei = [...store.newsList]
    let dataList = store.searchKeyword.trim().toLowerCase()
    if (dataList) {
      return kaobei.filter(item => item.biaoTi?.toLowerCase().includes(dataList)||item.fenLei.toLowerCase().includes(dataList))
    }
    return kaobei
})
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.pindao-page {
  width: 100%;
  min-height: 100vh;
  background: var(--bg-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  padding-bottom: 40px;
  transition: background 0.3s;
}


.page-header {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  transition: background 0.3s, border-color 0.3s;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-label {
  display: inline-block;
  background: var(--tag-bg);
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 10px;
  margin-bottom: 8px;
}
.header-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
  transition: color 0.3s;
}
.header-desc {
  font-size: 13px;
  color: var(--text-muted);
}
.header-stats {
  display: flex;
  gap: 24px;
}
.stat-box {
  text-align: center;
  background: var(--tag-bg);
  border-radius: 12px;
  padding: 14px 24px;
  min-width: 80px;
}
.stat-val {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}
.stat-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 6px;
}


.top-news {
  max-width: 1100px;
  margin: 24px auto 0;
  padding: 0 24px;
  cursor: pointer;
}
.top-img-wrap {
  position: relative;
  width: 100%;
  height: 340px;
  border-radius: 16px;
  overflow: hidden;
}
.top-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.top-news:hover .top-img-wrap img {
  transform: scale(1.03);
}
.top-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px 40px;
}
.top-badge {
  display: inline-block;
  background: var(--primary-color);
  color: var(--btn-text);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 10px;
  margin-bottom: 12px;
  width: fit-content;
}
.top-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 1.4;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.top-desc {
  font-size: 14px;
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}
.top-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: rgba(255,255,255,0.55);
}


.grid-container {
  max-width: 1100px;
  margin: 24px auto 0;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.grid-card {
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s;
  border: 1px solid transparent;
}
.grid-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-color);
}
.grid-img {
  width: 100%;
  height: 180px;
  overflow: hidden;
}
.grid-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.grid-card:hover .grid-img img {
  transform: scale(1.05);
}
.grid-body {
  padding: 16px 18px 20px;
}
.grid-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
  transition: color 0.2s;
}
.grid-card:hover .grid-title {
  color: var(--primary-color);
}
.grid-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}
.grid-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: var(--text-muted);
  flex-wrap: wrap;
}
.grid-source {
  color: var(--primary-color);
  font-weight: 500;
}
.grid-time {
  color: var(--text-muted);
}
.grid-read {
  color: var(--text-muted);
}


@media (max-width: 900px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .header-inner {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  .top-img-wrap {
    height: 220px;
  }
  .top-overlay {
    padding: 20px 24px;
  }
  .top-title {
    font-size: 18px;
  }
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
