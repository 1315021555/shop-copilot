import { createRouter, createWebHistory, createWebHashHistory,RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'user',
    // alias: ['/home','/home2'],   // 别名，可以定义很多个
    component: () => import('../views/User.vue'),
    children:[
      {
        path:'/',
        name:'shopAbout',
        component:()=> import('../components/user/ShopAbout.vue')
      },
      {
        path:'goodsDetail',
        name:'goodsDetail',
        component:()=> import('../components/user/GoodsDetail.vue')
      }
    ]
    // 重定向
    // redirect: '/welcome',
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
