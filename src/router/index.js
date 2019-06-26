import Vue from 'vue'
import Router from 'vue-router'
import  nprogress from 'nprogress'
import { getUser } from "@/utils/auth"

Vue.use(Router)
 const router = new Router({
  routes: [
    {
      // name:'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home'),
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish'),
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
  ]
})
router.beforeEach((to,from,next) => {
  nprogress.start()
  const userInfo = getUser()
  if(to.path !== '/login') {
    if(!userInfo) {
      if(from.path === '/login') {
        nprogress.done()
      }
      next({name:'login'})
    } else {
      next()
    }
  } else{
     if(!userInfo) {
       next()
     } else {
       window.location.href='/#/'
       windos.location.reload()
     }
  }
})
router.afterEach((to,from) => {
  nprogress.done() 
})
export default router