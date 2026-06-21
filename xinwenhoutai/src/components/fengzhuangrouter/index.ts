


import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../router/home.vue";
const router = createRouter({
  history: createWebHashHistory(),
  
 routes:[

{ path: '/login', component: () => import('../zujian/Login.vue') },
{ path: '/zhuce', component: () => import('../zujian/Lzhuce.vue') },   
  {
    path: '/', 
    component: Home, 
    redirect: '/shouye', 
    
   children: [
  { path: 'shouye', component: () => import('../zujian/Lshouye.vue') },
  { path: 'tongji', component: () => import('../zujian/Lkapian.vue') }, 
  { path: 'users', component: () => import('../zujian/Lbiaoge.vue') }, 
  { path: 'news', component: () => import('../zujian/Lxinwenkapian.vue') }, 
  
    { path: 'shezhi', component: () => import('../zujian/shezhi.vue') ,
      children:[
        { path: 'zhanghao', component: () => import('../shezhizizujian/zhanghao.vue'),
          children:[
            {path:'gerenziliao',component:()=>import('../shezhizizujian/zhanghaozizujian/gerenziliao.vue')},
            {path:'xiugaimima',component:()=>import('../shezhizizujian/zhanghaozizujian/xiugaimima.vue')},
            {path:'qiehuanzhanghao',component:()=>import('../shezhizizujian/zhanghaozizujian/qiehuanzhanghao.vue')},
            {path:'tuichudenglu',component:()=>import('../shezhizizujian/zhanghaozizujian/tuichudenglu.vue')},
          ]
        },
        { path: 'zhuti', component: () => import('../shezhizizujian/tongyong.vue')},
        { path: 'beifen', component: () => import('../shezhizizujian/tongyong.vue')},
        { path: 'xitong', component: () => import('../shezhizizujian/tongyong.vue')},
        { path: 'tongzhi', component: () => import('../shezhizizujian/tongyong.vue')}  

      ]
    } 
]
    
  }
]
})

router.beforeEach((to) => {
  
  
  if (to.path === '/login' || to.path === '/zhuce') {
    return true
  }
  
  if (!localStorage.getItem('token')) {
    return '/login'
  }
  
    if (localStorage.getItem('token')) {
    return true
    
   }
})





















export default router