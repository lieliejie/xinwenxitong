<template>
  <div class="header">
    <div class="header-left">
        <span class="title">{{ store.currentItem?.icon }}</span>
      <span class="title">{{ store.currentItem?.name }}</span>
    </div>
    <div class="header-right">
      <div class="user-info">
        <span class="avatar">👤</span>
        <span class="username">管理员</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import useStore from '../pinia';
let store  = useStore()


</script>

<style scoped>
.header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  
}

.header-left .title {
  font-size: 18px;
  font-weight: bold;
  color: #333;

}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-info .avatar {
  width: 36px;
  height: 36px;
  background-color: #07c160;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-right: 10px;
  font-size: 16px;
}

.user-info .username {
  font-size: 15px;
  color: #333;
}
</style>