<template>

 <div class="panel-card">
        <div class="panel-title">24小时热文</div>
        <div class="hot-list">
    <div class="hot-row" 
            v-for="(item,shuzi) in store.topReadList" 
            :class="'hot-top' + (shuzi + 1)" 
            :key="item.id"
          >  
        
        <router-link :to="'Qxiangqing/' + item.id">
            <span class="hot-rank">{{ shuzi + 1 }}</span>
            <span class="hot-text">{{ item.biaoTi }}</span>
    </router-link>
          </div>  
        </div>
      </div>

</template>


<script setup>
import useStore from '../pina/index.ts'
let store = useStore()  
</script>

<style>
a{
    display: contents;
}
.panel-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: background 0.3s;
}
.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 14px;
  transition: color 0.3s, border-color 0.3s;
}
.hot-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.hot-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}
.hot-rank {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--hover-bg);
  flex-shrink: 0;
  margin-top: 1px;
}
.hot-top1 .hot-rank { background: var(--rank-1); color: #fff; }
.hot-top2 .hot-rank { background: var(--rank-2); color: #fff; }
.hot-top3 .hot-rank { background: var(--rank-3); color: #fff; }
.hot-text {
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.6;
  transition: color 0.3s;
}
.hot-row:hover .hot-text {
  color: var(--primary-color);
}
</style>