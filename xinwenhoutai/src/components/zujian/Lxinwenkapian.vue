  <template>
    <div class="page-wrapper">
      <div class="table-container">
        <div class="table-header">
          <span class="table-title">新闻管理列表（待审核）</span>
          <div class="table-button">
            <button class="add-fbtn" @click="handleAdd">新增</button>
            <button class="add-sbtn" @click="store.isMultiSelect = !store.isMultiSelect">{{ store.isMultiSelect ? '取消选择' : '批量选择' }}</button>
            <button class="add-fbtn" @click="piliangbohuiff" v-if="store.isMultiSelect">批量驳回</button>
            <button class="add-fbtn" @click="piliangfabu" v-if="store.isMultiSelect">批量发布</button>
            <button class="add-fbtn" @click="yijianquanxuan" v-if="store.isMultiSelect">{{ store.dataList.every(item => item.checked) ? '取消全选' : '一键全选' }}</button>
                                                                                        
          </div>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              
              <th v-if="store.isMultiSelect" class="checkbox-col">选择</th>
              <th class="id-col">ID</th>
              <th>新闻标题</th>
              <th class="col-width">分类</th>
              <th class="col-width">来源</th>
              <th class="col-width">发布日期</th>
              <th class="col-width">状态</th>
              <th class="operate-col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in store.dataList" :key="item.id" class="table-row" @click="goToDetail(item.id)">
              <td v-if="store.isMultiSelect" class="checkbox-col" @click.stop>
                <input type="checkbox" 
                style="width: 16px; 
                height: 16px; 
                cursor: pointer;"
                v-model="item.checked"
                >
              </td>
              <td class="id-col">{{ item.id }}</td>
              <td>{{ biaoTi[item.id] }}</td>
              <td class="col-width">
                <span class="tag minsheng">{{ fenlei(item.fenLei) }}</span>
              </td>
              <td class="col-width">{{ item.laiYuan }}</td>
              <td class="col-width">{{ item.riQi }}</td>
              <td class="col-width">
                <span class="tag top">{{ item.isshenhe ? '已审核' : '待审核' }}</span>
              </td>
              <td class="operate-col" @click.stop>
                <span class="operate edit" @click="fabu(item)" v-if="item.isPublish">发布</span>
                <span class="operate delete" @click="bohui(item)" v-if="item.isReject">驳回</span>
                <span class="operate delete" @click="del(item)" v-if="item.isdel">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
       <xinzeng></xinzeng>
       <piliangbohui></piliangbohui>
       <dangefabu></dangefabu>
      <dangebohui></dangebohui>
        <sd></sd>
      <dpiliangbohui></dpiliangbohui>
      <dpiliangfabu></dpiliangfabu>
  </template>

  <script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import useStore from '../pinia';
  import piliangbohui from '../tanchuzujian/piliangbohui.vue';
  import xinzeng from '../tanchuzujian/xinzeng.vue';
  import dangefabu from '../tanchuzujian/dangefabu.vue';
  import dangebohui from '../tanchuzujian/dangebohui.vue';
  import sd from '../tanchuzujian/sd.vue';
  import dpiliangbohui from '../tanchuzujian/dpiliangbohui.vue';
  import dpiliangfabu from '../tanchuzujian/dpiliangfabu.vue';
  
  let store = useStore();
  const router = useRouter();
  
  const biaoTi = computed(() => {
    const tong = {};
    store.dataList.map(item => {
      tong[item.id] = item.biaoTi.length > 17 ? item.biaoTi.slice(0, 17) + '...' : item.biaoTi;
    });
    return tong;
  });

  
  let fenlei = (fenLei) => {
    return store.categoryList.find(item => item.id === fenLei)?.mingCheng || '未知';
  };

let piliangbohuiff = () => {
  store.selectedList = store.dataList.filter(item => item.checked);

  if (store.selectedList.length === 0) {
    store.isReject = true;
    return;
  }

  else{
    store.isBatchReject = true
  }

 
};
   let piliangfabu = () => {
    store.selectedList = store.dataList.filter(item => item.checked)
    if (store.selectedList.length === 0) {
      store.isReject = true
      return;
    }
   else{
    store.isBatchPublish = true
   }
  }
  let fabu = (item)=>{
    store.currentId = item
    store.isSinglePublish = true
    
    
    
    
    
    
    
    
    
    
    
    
    
   
    
    
    
    
    
    
  }
  let bohui =  (item)=>{
     store.currentId = item
     store.isSingleReject = true
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
  }
  let  yijianquanxuan = ()=>{
    store.dataList.forEach(item=>item.checked = !item.checked)
    
  }
  
  const handleAdd = () => {
    store.isAdd = true;
  };

  const goToDetail = (id: string) => {
    if (id) {
      router.push('/newsdetail/' + id)
    }
  }
  </script>

  <style scoped>
  .page-wrapper {
    width: 100%;
    background-color: #f5f5f5;
    padding: 1px 0;
  }

  .table-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    width: 1100px;
    margin: 20px auto;
  }

  .table-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .table-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  
  .table-button{
    display: flex;
    gap: 10px;
  }

  .add-fbtn {
    padding: 8px 20px;
    background-color: #07c160;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .add-fbtn:hover {
    background-color: #06ad56;
  }
  .add-sbtn {
    padding: 8px 20px;
    background-color: #ffa500;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .add-sbtn:hover {
    background-color: #ff8c00;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    table-layout: fixed; 
  }

  thead th {
    background-color: #fafafa;
    padding: 16px;
    font-size: 15px;
    color: #666;
    font-weight: normal;
    white-space: nowrap; 
  }

  tbody tr {
    border-bottom: 1px solid #eee;
  }
  .table-row {
    cursor: pointer;
    transition: background 0.15s ease;
  }
  tbody tr:hover {
    background-color: #fafafa;
  }

  tbody td {
    padding: 13px;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  
  .checkbox-col {
    width: 80px;
    text-align: center;
  }
  .id-col {
    width: 60px;
    text-align: center;
  }
  .col-width {
    width: 100px;
    text-align: center;
  }
  .operate-col {
    width: 140px;
    text-align: center;
  }

  .tag {
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    display: inline-block;
  }
  .tag.minsheng {
    background-color: #07c160;
  }
  .tag.bendi {
    background-color: #ff9800;
  }
  .tag.caijing {
    background-color: #2196f3;
  }
  .tag.top {
    background-color: #ff9800;
  }
  .tag.normal {
    background-color: #ccc;
  }

  .operate {
    margin-right: 8px;
    cursor: pointer;
    font-size: 14px;
  }
  .operate.edit {
    padding: 4px 10px;
    border-radius: 10px;
    color: #fff;
    background-color: #07c160;
    transition: 0.4s;
  }
  .operate.edit:hover {
    background-color: #6ee7b7;
  }
  .operate.delete {
    padding: 4px 10px;
    border-radius: 10px;
    color: #fff;
    background-color: #f56c6c;
    transition: 0.4s;
  }
  .operate.delete:hover {
    background-color: #e04b4b;
  }
  </style>