<template>
  <Qdaohang></Qdaohang>
  <div class="tongzhi-page">
    
    <div class="card">
      <div class="header-box">
        <div class="icon-box">
          <span class="icon">🔔</span>
        </div>
        <div class="header-info">
          <h3>消息通知</h3>
          <p>管理通知方式，及时接收审核反馈</p>
        </div>
      </div>
      <span class="close-btn" @click="router.back()" title="返回">✕</span>
    </div>

    <div class="form-wrapper history-wrapper">
      <div class="section-title">📋 最近通知记录</div>
      <div class="history-list">
        <div class="history-item" v-for="item in store.rejectedList" :key="item.id">
          <router-link 
            :to="'/boxiangxixinxi/' + item.id"
            class="history-link"
          >
          <div class="history-left">
            
            <div class="history-info">
              <span class="history-title">{{ item.biaoTi}}</span>
              <span class="history-time">{{ item.time }}</span>
            </div>
          </div>
          </router-link>
          <span class="history-status-text">驳回</span>
        </div>
      </div>
    </div>
    <Zaicifanbucg></Zaicifanbucg>
</div>

</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

let router = useRouter()
import Qdaohang from '../Qdaohang.vue'
import useStore from '../../pina/index.ts';
import Zaicifanbucg from './zhanghao/tanchuang/zaicifanbucg.vue';
let store = useStore()


</script>

<style scoped>
.tongzhi-page {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 26px;
  background: transparent;
}

.card {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  box-shadow: var(--shadow);
  position: relative;
  transition: background 0.3s, box-shadow 0.3s;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--btn-gray);
  color: var(--btn-gray-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.close-btn:hover {
  background: var(--text-muted);
  color: #fff;
  transform: scale(1.1);
}

.header-box {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-box {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #fa8c16, #ffa940);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-box .icon {
  font-size: 36px;
}

.header-info h3 {
  font-size: 20px;
  margin: 0 0 4px;
  color: var(--text-color);
  transition: color 0.3s;
}
.header-info p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  transition: color 0.3s;
}


.form-wrapper {
  background: var(--card-bg);
  border-radius: 20px;
  padding: 32px 40px;
  box-shadow: var(--shadow);
  margin-bottom: 24px;
  transition: background 0.3s, box-shadow 0.3s;
}

.section-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 6px;
  transition: color 0.3s;
}
.section-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  transition: color 0.3s, border-color 0.3s;
}

.form-group {
  margin-bottom: 22px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 8px;
  transition: color 0.3s;
}

.form-input {
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 1px solid var(--input-border);
  border-radius: 10px;
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-color);
  outline: none;
  box-sizing: border-box;
  transition: background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.2s;
}
.form-input:focus {
  border-color: var(--warning-color);
  box-shadow: 0 0 0 3px rgba(250, 140, 22, 0.1);
}
.form-input::placeholder {
  color: var(--text-muted);
}


.email-display {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 46px;
  padding: 0 16px;
  background: var(--hover-bg);
  border-radius: 10px;
  transition: background 0.3s;
}
.email-text {
  font-size: 14px;
  color: var(--text-color);
  transition: color 0.3s;
}
.email-badge {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 500;
}
.email-badge.verified {
  background: rgba(7, 193, 96, 0.15);
  color: var(--primary-color);
}


.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
  transition: color 0.3s;
  user-select: none;
}
.checkbox-item input[type="checkbox"] {
  display: none;
}
.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid var(--input-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}
.checkbox-item input:checked + .checkmark {
  background: var(--warning-color);
  border-color: var(--warning-color);
}
.checkbox-item input:checked + .checkmark::after {
  content: '✓';
  color: #fff;
  font-size: 13px;
  font-weight: bold;
}
.checkbox-text {
  transition: color 0.3s;
}


.btn-group {
  margin-top: 30px;
  display: flex;
  gap: 14px;
}

.btn {
  width: 120px;
  height: 46px;
  border-radius: 10px;
  font-size: 15px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
.btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.save-btn {
  background: var(--primary-gradient);
  color: var(--btn-text);
}

.back-btn {
  background: var(--btn-gray);
  color: var(--btn-gray-text);
}


.history-wrapper {
  padding-bottom: 28px;
}

.history-list {
  margin-top: 16px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
  border-radius: 8px;
  transition: background 0.3s ease, border-color 0.3s, padding-left 0.3s;
}
.history-item:hover {
  background: var(--hover-bg);
  padding-left: 8px;
}
.history-item:last-child {
  border-bottom: none;
}

.history-link {
  text-decoration: none;
  flex: 1;
  min-width: 0;
  color: inherit;
  display: flex;
  align-items: center;
}

.history-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.history-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.history-dot.pass {
  background: var(--primary-color);
}
.history-dot.reject {
  background: var(--danger-color);
}
.history-dot.info {
  background: var(--info-color);
}

.history-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.history-title {
  font-size: 15px;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s;
}
.history-time {
  font-size: 12px;
  color: var(--text-muted);
  transition: color 0.3s;
}

.history-status-text {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 10px;
  flex-shrink: 0;
  margin-left: 12px;
}
.history-status-text.pass {
  background: rgba(7, 193, 96, 0.12);
  color: var(--primary-color);
}
.history-status-text.reject {
  background: rgba(224, 72, 72, 0.12);
  color: var(--danger-color);
}
.history-status-text.info {
  background: rgba(64, 158, 255, 0.12);
  color: var(--info-color);
}
.history-status-text{
  font-size: 15px;
  color: red;
}
</style>
