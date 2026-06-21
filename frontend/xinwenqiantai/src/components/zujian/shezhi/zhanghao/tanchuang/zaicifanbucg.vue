<template>
  <div class="tip-modal" v-if="store.isRepublish">
    <div class="tip-box">
      <p>✅ 稿件已重新发布成功！</p>
      <div class="tip-buttons">
        <button class="tip-btn confirm" @click="queren">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useStore from '../../../../pina';
let store = useStore()
let router = useRouter()
let queren = ()=>{
    store.isRepublish = false
    
    store.fetchRejected()
    router.push('/Qxiaoxitongzhi')
}
</script>

<style scoped>
.tip-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.tip-box {
  background: #fff;
  width: 280px;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
}

.tip-box p {
  font-size: 15px;
  margin-bottom: 18px;
  color: #333;
}

.tip-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.tip-btn {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s;
}

.tip-btn.confirm {
  background: #07c160;
  color: #fff;
}
.tip-btn.confirm:hover {
  background: #06ad56;
}
</style>