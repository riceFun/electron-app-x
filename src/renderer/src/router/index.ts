import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@renderer/stores/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/chrome'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@renderer/views/Login.vue'),
    meta: { requiresUnauth: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@renderer/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/chrome',
    name: 'Chrome',
    component: () => import('@renderer/views/Chrome.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHashHistory(), // Electron 推荐使用 hash 模式
  routes
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresUnauth && authStore.isAuthenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()

//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next({ name: 'Login' })
//   } else if (to.meta.requiresUnauth && authStore.isAuthenticated) {
//     next({ name: 'Home' })
//   } else {
//     next()
//   }
// })

export default router
