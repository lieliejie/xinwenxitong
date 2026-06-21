<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      猎猎杰后台管理系统
    </div>
    <div class="sidebar-menu">
                            
        <router-link            
          :class="['menu-item',{'active': route.path === item.path}]" 
          v-for="item in store.menuList" 
          :key="item.id"
          :to="{path:item.path}"  
          @click="store.currentItem = item"   
         > 
         
        <span class="icon">{{ item.icon }}</span>
        <span class="text">{{item.name}}</span>
      </router-link>
     
    

    
  </div>
  </div>
</template>
       
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from '../pinia';
import xinzeng from '../tanchuzujian/xinzeng.vue';
import { onMounted } from 'vue';
import Piliangbohui from '../tanchuzujian/piliangbohui.vue';
import Dangefabu from '../tanchuzujian/dangefabu.vue';
import Dangebohui from '../tanchuzujian/dangebohui.vue';
import Sd from '../tanchuzujian/sd.vue';
import Dpiliangbohui from '../tanchuzujian/dpiliangbohui.vue';
import Dpiliangfabu from '../tanchuzujian/dpiliangfabu.vue';

const route = useRoute();
const store = useStore();

onMounted(() => {
  
  const dangqian = store.menuList.find(item => item.path === route.path)
  
  if (dangqian) store.currentItem = dangqian
})





</script>

<style scoped>

a {
  text-decoration: none;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;  
}

.sidebar {
  width: 210px;
  height: 100vh;
  background-color: #10b981;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
}


.sidebar-logo {
  padding: 30px 10px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}


.sidebar-menu {
  left: 0;
  width: 100%;
}


.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 25px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 0.5s ease;
}
.menu-item:hover{
background-color: rgba(255, 255, 255, 0.23);
   
}
.active{
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: inset 4px 0 0 0 #fff;  
}
.menu-item.active:hover {
  background-color: rgba(255, 255, 255, 0.5);  
}

.menu-item .icon {
  margin-right: 12px;
  font-size: 18px;
}


.menu-item .text {
  font-size: 15px;
}
</style>