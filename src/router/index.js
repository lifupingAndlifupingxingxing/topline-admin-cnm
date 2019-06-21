import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    // home 组件
    {
      name:'home',
      path:'/',
      component:() => import('@/views/home/index.vue')
    },
    // login 组件
    {
      name:'login',
      path:'/login',
      component:() => import('@/views/login/index.vue')
    },
  ]
})
