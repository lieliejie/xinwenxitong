<template>
 <div class="panel-title">热门标签</div>
        <div class="tag-cloud">
          <span class="tag-item"
          v-for="item in fangkuai2"
          :key="item.id"
          >
          <router-link 
          :to="'/Qzhiding?fenlei=' + item.id"
          >{{ item.name }}</router-link>
        </span>
          
        </div>
</template>

<script setup>
let fangkuai2  = [
  { id: 'minsheng', name: '民生' },
  { id: 'shizheng', name: '时政' },
  { id: 'bendi', name: '本地' },
  { id: 'caijing', name: '财经' }
]
</script>

<style>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
.tag-item {
  padding: 6px 14px;
  background: var(--tag-bg);
  color: var(--primary-color);
  font-size: 13px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.tag-item:hover {
  background: var(--primary-color);
  color: var(--btn-text);
}
</style>