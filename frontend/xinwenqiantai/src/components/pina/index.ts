import {defineStore} from 'pinia'
import http from '../axios/index.ts'
import { ref,computed } from 'vue'
import router from '../router/index.ts'

const useStore = defineStore('cangku',()=>{

interface News {
  id: string
  biaoTi: string
  jianJie: string
  tuPian: string
  fenLei: string
  riQi: string
  yueduLiang?: number
}

interface Comment {
  id: string
  xinwenId: string
  userId: string
  username: string
  neirong: string
  shijian: string
  dianzan: number
}

let newsList = ref<News[]>([])
let currentTab = ref('tuijian')
let searchKeyword = ref('')
let isRepublish = ref(false)

const topList = [
  { id: 'tuijian', name: '推荐' ,path:'/'},
  { id: 'gengduo', name: '更多' ,path:'/Qzhiding'},
  { id: 'shezhi', name: '设置' ,path:'/Qshezhi'},
  { id: 'guanyu', name: '猎猎杰' ,path:'/Qlieliejie'}
]

let fetchNews = async () => {
    try {
    let r = await http.get('/zhanshidataList')
    newsList.value = r.data || []
    console.log("存入store的数据,", newsList.value);
    
  } catch (error) {
    console.error(error)
  }
}
fetchNews()

const rejectedList = ref([])

let fetchRejected = async ()=>{
    try {
        let res = await http.get('/rejectedList')
        rejectedList.value = res.data
    } catch (error) {
        console.error('获取通知历史数据失败:', error)
    }
}
fetchRejected()

let increaseReadCount = async (item: News) => {
  let res = await http.post('/api/read', { id: item.id })
  item.yueduLiang = res.data.yueduLiang
}

let topReadList = computed(()=>{
   return [...newsList.value]
      .filter(item => item && item.biaoTi)
      .sort((a, b) => (b.yueduLiang || 0) - (a.yueduLiang || 0))
      .slice(0, 4)
      .map(item => ({
        ...item,
        biaoTi: item.biaoTi.length > 15 
          ? item.biaoTi.slice(0, 15) + '...' 
          : item.biaoTi
      }))
})

let truncateTitle = (item:any)=>{
  if (!item || !item.biaoTi) return ''
  return item.biaoTi.length > 15 ? item.biaoTi.slice(0, 15) + '...' : item.biaoTi  
}

const formatTime = (riQi:any) => {
  const diff = Math.floor((Date.now() - new Date(riQi).getTime()) / 1000);
  if (diff < 60) return '刚刚';
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}天前`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}个月前`;
  return `${Math.floor(diff / 31536000)}年前`;
}

let search = (value:any)=>{
  searchKeyword.value = value
  if (router.currentRoute.value.path !== '/Qzhiding') {
    router.push('/Qzhiding')
  }
}

let commentList = ref<Comment[]>([])
let commentCount = ref(0)
let showComments = ref(false)
let currentNewsId = ref('')

let setNewsId = (id: string) => {
  currentNewsId.value = id
  fetchComments()
}

let fetchComments = async () => {
  if (!currentNewsId.value) return
  try {
    const res = await http.get('/api/pinglun', { params: { xinwenId: currentNewsId.value } })
    commentList.value = res.data.data || []
    commentCount.value = commentList.value.length
  } catch (error) { console.error('获取评论失败', error) }
}

let postComment = async (neirong: string) => {
  const userId = localStorage.getItem('userId')
  const username = localStorage.getItem('username') || '匿名用户'
  const avatar = localStorage.getItem('avatar') || ''
  if (!userId) { alert('请先登录'); return }
  try {
    const res = await http.post('/api/pinglun', {
      xinwenId: currentNewsId.value,
      userId,
      username,
      avatar,
      neirong
    })
    commentList.value.unshift(res.data.data)
    commentCount.value = commentList.value.length
    return true
  } catch (error) { console.error('评论失败', error); return false }
}

let deleteComment = async (id: string) => {
  try {
    await http.delete(`/api/pinglun/${id}`)
    commentList.value = commentList.value.filter(item => item.id !== id)
    commentCount.value = commentList.value.length
  } catch (error) { console.error('删除失败', error) }
}

return {
    topList,
    newsList,
    currentTab,
    searchKeyword,
    search,
    increaseReadCount,
    topReadList,
    formatTime,
    truncateTitle,
    rejectedList,
    fetchRejected,
    isRepublish,
    commentList,
    commentCount,
    showComments,
    currentNewsId,
    setNewsId,
    fetchComments,
    postComment,
    deleteComment,
}
})

export default useStore
