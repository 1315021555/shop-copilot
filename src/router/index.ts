import { createRouter, createWebHistory, createWebHashHistory,RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  //匹配数字路径
  {
    path:'/shop/:shopId',
    name:'shop',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'login',
    // alias: ['/home','/home2'],   // 别名，可以定义很多个
    component: () => import('../views/Login.vue'),
  
  },
  {
    path:'/user',
    name:'user',
    component:()=> import('../views/User.vue'),
    children:[
      {
        path:'',
        name:'shopAbout',
        component:()=> import('../components/user/ShopAbout.vue')
      },
      {
        path:'goodsDetail',
        name:'goodsDetail',
        component:()=> import('../components/user/GoodsDetail.vue')
      }
    ]
  },

  {
    path:'/merchant',
    name:'merchant',
    component:()=> import('../views/Merchant.vue')
  },

  
]

const router = createRouter({
  history: createWebHistory(),// history传统模式
  // history: createWebHashHistory(), // hash模式
  routes
})

export default router
