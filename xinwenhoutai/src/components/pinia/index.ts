import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { http } from "../fengzhuang/axios";
import type { NewsItem } from "../store/xianzhi";

export const useStore = defineStore('cangku', () => {
  let menuList = ref([
    { id: 1, icon: '🏠', name: '首页', path: '/shouye' },
    { id: 2, icon: '📊', name: '数据统计', path: '/tongji' },
    { id: 3, icon: '👥', name: '用户管理', path: '/users' },
    { id: 4, icon: '📰', name: '新闻管理', path: '/news' },
    { id: 5, icon: '⚙️', name: '系统设置', path: '/shezhi' }
  ])

  const categoryList = ref([
    { id: 'quanbu', mingCheng: '全部' },
    { id: 'shizheng', mingCheng: '时政' },
    { id: 'minsheng', mingCheng: '民生' },
    { id: 'bendi', mingCheng: '本地' },
    { id: 'caijing', mingCheng: '财经' },
    { id: 'jinri', mingCheng: '今日' }
  ]);

  let currentItem = ref({})
  let dataList = ref<NewsItem[]>([])
  let isAdd = ref(false)
  let isMultiSelect = ref(false)
  let isReject = ref(false)
  let isPublish = ref(false)
  let currentId = ref('')
  let isSingleReject = ref(false)
  let isSinglePublish = ref(false)
  let isBatchReject = ref(false)
  let isBatchPublish = ref(false)
  let isBatchRejectTip = ref(false)

  let selectedList = ref([])

  let fetchData = async () => {
    try {
      let r = await http.get('/zhongzhuandataList')
      dataList.value = r.data.map((item: NewsItem) => ({
        ...item,
        isPublish: true,
        isReject: true,
        isdel: false,
        checked: false
      }))
      
      console.log("存入store的数据：", dataList.value)
    } catch (error) {
      console.log("拿待审核数据失败", error);
    }
  }
 
  fetchData()

  return {
    menuList,
    currentItem,
    fetchData,
    dataList,
    categoryList,
    isAdd,
    isMultiSelect,
    isReject,
    isPublish,
    isSinglePublish,
    currentId,
    isSingleReject,
    isBatchRejectTip,
    selectedList,
    isBatchReject,
    isBatchPublish
  }
})

export default useStore
