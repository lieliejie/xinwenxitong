<template>
  <header class="top-bar">
    <div class="top-bar-inner">
      <div class="logo">
        <span class="logo-icon">✦</span>
        <span class="logo-text">资讯</span>
      </div>
      <nav class="tab-bar">
        <router-link 
          v-for="item in store.topList"
          :key="item.id"
          :to="item.path"
        >{{ item.name }}</router-link>
      </nav>
      
      <div class="search-entry">
        <span class="search-icon">🔍</span>
        <input 
        ref="searchInputRef"
        type="text" 
        class="search-text" 
        placeholder="请输入关键词"
        :value="store.searchKeyword"
        @input="(e) => store.searchKeyword = e.target.value"
        @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">搜索</button>
      </div>
      <button class="logout-btn" @click="tuichu">退出登录</button>
      <button class="logout-btn" @click="fabuxinwen">发布新闻</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useStore from '../pina/index.ts'
import { ref } from 'vue'
const router = useRouter()
const store = useStore()


const searchInputRef = ref(null)


const handleSearch = () => {
  const value = searchInputRef.value?searchInputRef.value.value : ''                        

  store.search(value)
}

const tuichu = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  router.push('/denglu')
}
let fabuxinwen = () => {
  router.push('/Qfabuxinwen')
}
</script>

<style scoped>
.top-bar {
  width: 100%;
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s, border-color 0.3s;
}
.top-bar-inner {
  max-width: 1100px;
  margin: 0 auto;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 24px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-right: 40px;
}
.logo-icon {
  font-size: 20px;
  color: var(--primary-color);
}
.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  transition: color 0.3s;
}
.tab-bar {
  display: flex;
}
.tab-bar :deep(a) {
  display: inline-block;
  font-size: 15px;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 8px 16px;
  margin: 0 4px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.tab-bar :deep(a):hover {
  color: var(--text-color);
}
.tab-bar :deep(a).router-link-active {
  color: var(--primary-color);
  font-weight: 600;
  border-bottom-color: var(--primary-color);
}
.search-entry {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--hover-bg);
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.search-entry:hover {
  background: var(--border-color);
}
.search-icon {
  font-size: 14px;
}
.search-text {
  flex: 1;              
  border: none;          
  outline: none;         
  background: transparent; 
  font-size: 13px;
  color: var(--text-color);
  padding: 0;            
  transition: color 0.3s;
}
.search-text::placeholder {
  color: var(--text-muted);
}
.search-btn {
  flex-shrink: 0;
  background: var(--primary-color);
  color: var(--btn-text);
  border: none;
  border-radius: 14px;
  padding: 4px 14px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}
.search-btn:hover {
  background: var(--primary-hover);
}
.logout-btn {
  margin-left: 12px;
  height: 32px;
  padding: 0 16px;
  border: 1px solid var(--danger-color);
  background: var(--card-bg);
  color: var(--danger-color);
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.logout-btn:hover {
  background: var(--danger-color);
  color: var(--btn-text);
}
</style>
