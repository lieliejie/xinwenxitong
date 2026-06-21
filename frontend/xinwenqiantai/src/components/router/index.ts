


import { createRouter, createWebHashHistory } from 'vue-router'

let router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: (to, from, savedPosition) => {
        
        if (savedPosition) {
            return savedPosition
        }
        
        return { top: 0 }
    },
    routes:[
        {
            path: '/denglu',
            name: 'Qdenglu',
            component: () => import('../zujian/Qdenglu.vue')
        },
        {
            path: '/',
            name: 'Qshouye',
            component: () => import('../zujian/Qshouye.vue'),
        
        },
         {
            path: '/Qshezhi',
            name: 'Qshezhi',
            component: () => import('../zujian/Qshezhi.vue'),

        },
        {
            path: '/Qkapian',
            name: 'Qkapian',
            component: () => import('../zujian/Qkapian.vue'),
          
        },
         {
            path: '/Qxiangqing/:id',   
            name: 'Qxiangqing',
            component: () => import('../zujian/Qxiangqing.vue'),
        },
        {
            path: '/Qgongyong/',
            name: 'Qgongyong',
            component: () => import('../zujian/Qgongyong.vue'),
         
        },
        {
            path:'/Qzhiding',
            name:'Qzhiding',
            component: () => import('../zujian/Qzhiding.vue')
        },
        {
            path:'/Qlieliejie',
            name:'Qlieliejie',
            component: () => import('../zujian/Qlieliejie.vue')
        },
                {
            path:'/QQzhanghao',
            name:'QQzhanghao',
            component: () => import('../zujian/shezhi/QQzhanghao.vue')
        },
        {
            path:'/gerenziliao',
            name:'Gerenziliao',
            component: () => import('../zujian/shezhi/zhanghao/gerrenziliao.vue')
        },
        {
            path:'/shezhi/zhanghao/xiugaimima',
            name:'Xiugaimima',
            component: () => import('../zujian/shezhi/zhanghao/xiugaimima.vue')
        },
        {
            path:'/QQzhuti',
            name:'QQzhuti',
            component: () => import('../zujian/shezhi/QQzhuti.vue')
        },
        {
            path:'/Qxiaoxitongzhi',
            name:'Qxiaoxitongzhi',
            component: () => import('../zujian/shezhi/Qxiaoxitongzhi.vue')
        },
        {
            path:'/boxiangxixinxi/:id',
            name:'Boxiangxixinxi',
            component: () => import('../zujian/shezhi/zhanghao/boxiangxixinxi.vue')
        },
         {
            path:'/Qfabuxinwen',
            name:'Qfabuxinwen',
            component: () => import('../zujian/Qfabuxinwen.vue')
        }
    ]
})


router.beforeEach((to) => {
    if(to.path === '/denglu') {
        return true
    }
    if(!localStorage.getItem('token')) {
        return '/denglu'
    }   
    if(localStorage.getItem('token')) {
     return true
    }
})

export default router