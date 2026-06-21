<template>
   <div class="main-feed">
      <div class="section-header">
        <span class="section-title">为你推荐</span>
        <router-link 
        :to="'/Qzhiding'"
        ><span class="section-more">更多></span></router-link>
      </div>
<div 
 v-for="item in store.topReadList" 
  :key="item.id"
  @click="store.increaseReadCount(item)"

  >
  
  <div class="news-card" v-if="getImgArr(item.tuPian).length < 2"> 
    <router-link :to="'Qxiangqing/' + item.id">
    
  <div class="card-left">
    <div class="card-img-wrap">
      <div class="card-img"><img :src="getImgArr(item.tuPian)[0]" alt=""></div>
    </div>
  </div>
  <div class="card-right" >
     <div class="card-right-top">
     <h3 class="card-title">{{ item.biaoTi }}</h3>
    <p class="card-desc">{{ item.jianJie }}</p>
     </div>
      <span class="meta-source">
       {{ usefenlei(item.fenLei) }}
      </span>
      <div class="small-card">
      <span class="meta-time">{{ store.formatTime(item.riQi) }}</span>
      <span class="meta-read">{{ item.yueduLiang || 0 }}阅读</span>
      <span class="meta-comment">328评论</span>
      </div>
    </div>
</router-link>
  </div>

  
  <div class="news-card-multi" v-else>
    <router-link :to="item.id ? 'Qxiangqing/' + item.id : '#'">
      <div class="card-top">
        <h3 class="card-title">{{ item.biaoTi }}</h3>
      </div>
      <div class="card-images">
        <img v-for="(img, idx) in getImgArr(item.tuPian)" :key="idx" :src="img" alt="">
      </div>
      <span class="meta-source">{{ usefenlei(item.fenLei) }}</span>
      <div class="small-card">
        <span class="meta-time">{{ store.formatTime(item.riQi) }}</span>
        <span class="meta-read">{{ item.yueduLiang || 0 }}阅读</span>
        <span class="meta-comment">328评论</span>
      </div>
    </router-link>
  </div>
</div>
</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import useStore from '../pina/index.ts'   
import http from '../axios/index.ts';
const store = useStore()
let fenleiliebiao = ref([
  {'mingcheng':'民生',id:'minsheng'},
  {'mingcheng':'财经',id:'caijing'},
  {'mingcheng':'时政',id:'shizheng'},
  {'mingcheng':'本地',id:'bendi'}
])
let usefenlei = (fenlei)=>{
  const result = fenleiliebiao.value.find(item=>item.id === fenlei)
  return result ? result.mingcheng : '未知'
}

const getImgArr = (pic) => {
  if (!pic) return []
  return Array.isArray(pic) ? pic : [pic]
  
}
</script>

<style scoped>
 a {
  display: contents;
}
.main-feed {
  flex: 1;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 0 24px;
  transition: background 0.3s;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 16px;
  border-bottom: 1px solid var(--border-color);
}
.section-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color);
  transition: color 0.3s;
}
.section-more {
  font-size: 13px;
  color: var(--text-muted);
  cursor: pointer;
}
.section-more:hover {
  color: var(--primary-color);
}
.news-card {
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition:  ease-in-out 0.2s;
  border-top: 1px solid var(--border-color);
}
.news-card:last-child {
  border-bottom: none;
}

.card-right-top:hover .card-title{
  color: var(--primary-color)
}

.card-left {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.card-di{
  display: flex;
  flex-direction: column;
  justify-content: left;
}
.card-img-wrap {
  
  width: 200px;
  height: 130px;
  border-radius: 8px;
  overflow: hidden;
}
.card-img {
  width: 100%;
  height: 100%;
}
.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-title {
  font-size: 17px;
  font-weight: 500;
  color: var(--text-color);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
  transition: color 0.3s;
}

.card-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
}
.card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: var(--text-muted);
}
.meta-source {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 13px;
}
.source-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  color: var(--btn-text);
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.small-card{
 display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: var(--text-muted);
}


.news-card-multi{
  display: flex;
  flex-direction: column;
  padding: 20px 0;
 border-top: 1px solid var(--border-color);
}
.news-card-multi a {
  text-decoration: none;
  color: inherit;
}

.news-card-multi a:hover .card-title {
  color: var(--primary-color);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-images {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;

}
.card-images img {
  height: 130px;
  object-fit: cover;
  border-radius: 6px;
}

</style>
