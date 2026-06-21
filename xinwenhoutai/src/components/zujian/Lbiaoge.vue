<template>
  <div class="table-container">
    <div class="table-header">
      <span class="table-title">用户列表</span>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>用户ID</th>
          <th>用户名称</th>
          <th>注册时间</th>
          <th>用户状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.yonghuming }}</td>
          <td>{{ user.riQi || '-' }}</td>
          <td>
            <span class="status active">正常</span>
          </td>
          <td>
            <span class="operate green">编辑</span>
            <span class="operate red" @click="shanchu(user.id)">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { http } from '../fengzhuang/axios'

const userList = ref([])

const fetchUsers = async () => {
  try {
    const res = await http.get('/yonghulist')
    userList.value = res.data || []
  } catch (err) {
    console.error('获取用户列表失败', err)
  }
}

const shanchu = async (id) => {
  if (!confirm('确定删除该用户？')) return
  try {
    await http.delete(`/yonghulist/${id}`)
    fetchUsers()
  } catch (err) {
    console.error('删除失败', err)
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.table-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  width: 100%;
  margin-top: 20px;
  overflow-x: auto;
}

.table-header {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.table-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead th {
  background-color: #fafafa;
  padding: 16px;
  font-size: 15px;
  color: #666;
  font-weight: normal;
}

tbody tr {
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.6s ease;
}
tbody tr:hover {
  background-color: #f0f0f0;
}

tbody td {
  padding: 16px;
  font-size: 14px;
  color: #333;
}

.status.active {
  background-color: #07c160;
  color: #fff;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.operate {
  margin-right: 8px;
  cursor: pointer;
  font-size: 14px;
}

.operate.green {
  color: #07c160;
}

.operate.red {
  color: #f56c6c;
}
</style>
