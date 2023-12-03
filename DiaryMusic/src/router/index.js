import { createRouter, createWebHashHistory } from 'vue-router'
import homeIndex from '@/views/home/homeIndex.vue'
import homeMain from '@/views/home/homeMain.vue'
const routes = [
    {
    path: '/',
    name: 'home',
    component: homeIndex,
    children:[
      {
        path:'/',
        component:homeMain
      },
      {
        path:'/login',
        name:'login',
        component:()=>import('@/views/home/loginView.vue')
      },
      {
        path:'/song/:sid',
        component:()=>import('@/views/intro/songDetail.vue'),
        props:true
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/home/regiView.vue')
      },
      {
        path:'/my',
        name:'my',
        component:()=>import('@/views/home/myInfo.vue')
      },
      {
        path: '/intro',
        component: () => import('@/views/intro/introPage.vue')
      },
    ]
  },

  {
    path:'/backstage',
    component:()=>import('@/views/backstage/index.vue'),
    children: [
      {
        path:'/dashboard',
        component: ()=>import('@/views/backstage/dashBoard.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
