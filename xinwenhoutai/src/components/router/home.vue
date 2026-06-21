<template>
  <div class="layout">
    
    <aside class="sidebar">
      
      <Lcedaohang/>
    </aside>
    
    <div class="right-area">
      
      <header class="header-wrapper">
        <Ldingdaohang /> 
      </header>
      
      <main class="main-content"> 
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">

import Lcedaohang from '../zujian/Lcedaohang.vue'
import Ldingdaohang from '../zujian/Ldingdaohang.vue';

import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import useStore from '../pinia'

const route = useRoute()
const store = useStore()

</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  
  
  
}
.sidebar {
  width: 220px;
  flex-shrink: 0;
  height: 100%;
}
.right-area {
    flex: 1; 
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100vh;
  
}
.header-wrapper {
  flex-shrink: 0;
  height: 70px;
 
}
.main-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
 border:3px solid #e5e7eb;
  border-radius: 8px;
}
.main-content::-webkit-scrollbar {
  display: none;
}

</style>