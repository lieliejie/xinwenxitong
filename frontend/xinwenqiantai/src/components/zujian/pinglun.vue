<template>
  <div class="comment-section">
    
    <div class="comment-header">
      <span class="comment-title">评论</span>
      <span class="comment-count" v-if="store.commentList.length > 0">{{ store.commentList.length }}条评论</span>
    </div>

    
    <div class="comment-input-box">
      <textarea
        v-model="inputNeirong"
        placeholder="写下你的评论..."
        maxlength="500"
        rows="3"
        class="comment-textarea"
      ></textarea>
      <div class="comment-input-footer">
        <span class="char-count">{{ inputNeirong.length }}/500</span>
        <button
          class="submit-btn"
          :disabled="!inputNeirong.trim() || isSubmitting"
          @click="postComment"
        >
          {{ isSubmitting ? '发布中...' : '发表评论' }}
        </button>
      </div>
    </div>

    
    <div class="comment-list" v-if="store.commentList.length > 0">
      <div
        v-for="item in store.commentList"
        :key="item.id"
        class="comment-item"
      >
        <img v-if="item.avatar" :src="touxiangSrc(item.avatar)" class="comment-avatar" />
        <div v-else class="comment-avatar comment-avatar-text">{{ item.username?.charAt(0) }}</div>
        <div class="comment-body">
          <div class="comment-info">
            <span class="comment-username">{{ item.username }}</span>
            <span class="comment-time">{{ shijianGeShiHua(item.shijian) }}</span>
          </div>
          <div class="comment-content">{{ item.neirong }}</div>
        </div>
        <button
          v-if="item.userId === dangqianUserId"
          class="comment-delete"
          @click="store.deleteComment(item.id)"
        >删除</button>
      </div>
    </div>

    
    <div class="comment-empty" v-else>
      <span>暂无评论，来说两句吧</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useStore from '../pina/index'

const store = useStore()

const inputNeirong = ref('')
const isSubmitting = ref(false)
const dangqianUserId = localStorage.getItem('userId') || ''



const touxiangSrc = (avatar) => {
  if (!avatar) return ''
  if (avatar.startsWith('data:')) return avatar
  if (avatar.startsWith('http')) return avatar
  return 'http://localhost:3000' + avatar
}


const shijianGeShiHua = (shijian) => {
  if (!shijian) return ''
  const cha = Math.floor((Date.now() - new Date(shijian).getTime()) / 1000)
  if (cha < 60) return '刚刚'
  if (cha < 3600) return `${Math.floor(cha / 60)}分钟前`
  if (cha < 86400) return `${Math.floor(cha / 3600)}小时前`
  if (cha < 2592000) return `${Math.floor(cha / 86400)}天前`
  return shijian.slice(0, 10)
}


const postComment = async () => {
  const neirong = inputNeirong.value.trim()
  if (!neirong || isSubmitting.value) return
  isSubmitting.value = true
  const ok = await store.postComment(neirong)
  if (ok) inputNeirong.value = ''
  isSubmitting.value = false
}
</script>

<style scoped>
.comment-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
  transition: border-color 0.3s;
}


.comment-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 20px;
}
.comment-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color);
  transition: color 0.3s;
}
.comment-count {
  font-size: 13px;
  color: var(--text-muted);
}


.comment-input-box {
  margin-bottom: 28px;
}
.comment-textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-color);
  background: var(--card-bg);
  resize: none;
  outline: none;
  transition: border-color 0.2s, background 0.3s, color 0.3s;
  font-family: inherit;
}
.comment-textarea:focus {
  border-color: var(--primary-color);
}
.comment-textarea::placeholder {
  color: var(--text-muted);
}
.comment-input-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
}
.char-count {
  font-size: 12px;
  color: var(--text-muted);
}
.submit-btn {
  padding: 8px 24px;
  background: var(--primary-color);
  color: var(--btn-text);
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s, background 0.2s;
}
.submit-btn:hover:not(:disabled) {
  opacity: 0.85;
}
.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}


.comment-list {
  display: flex;
  flex-direction: column;
}
.comment-item {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  transition: border-color 0.3s;
}
.comment-item:last-child {
  border-bottom: none;
}
.comment-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary-color);
  color: var(--btn-text);
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  object-fit: cover;
}
.comment-body {
  flex: 1;
  min-width: 0;
}
.comment-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}
.comment-username {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
  transition: color 0.3s;
}
.comment-time {
  font-size: 12px;
  color: var(--text-muted);
}
.comment-content {
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.7;
  word-break: break-all;
  transition: color 0.3s;
}
.comment-delete {
  flex-shrink: 0;
  align-self: center;
  padding: 4px 10px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}
.comment-delete:hover {
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.08);
}


.comment-empty {
  text-align: center;
  padding: 40px 0;
  font-size: 14px;
  color: var(--text-muted);
}
</style>
