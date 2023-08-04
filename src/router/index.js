import { createRouter, createWebHistory } from 'vue-router'
import store from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { requireAuth: false },
      component: () => import('../views/indexView.vue'),
      children: [{
        path: '/login',
        name: 'login',
        meta: { requireAuth: false },
        component: () => import('../views/auth/loginView.vue')
      }, {
        path: '/register',
        name: 'register',
        meta: { requireAuth: false },
        component: () => import('../views/auth/registerView.vue')
      }, {
        path: '/resetPassword',
        name: 'resetPassword',
        meta: { requireAuth: false },
        component: () => import('../views/auth/resetPasswordView.vue')
      }, {
        path: '/profile',
        name: 'profile',
        meta: { requireAuth: true },
        component: () => import('../views/personal/profileView.vue')
      }, {
        path: '/deprecated/game',
        name: 'game',
        meta: { requireAuth: true },
        component: () => import('../views/game/GameFrame.vue')
      }]
    },
    {
      path: '/welcome',
      name: 'welcome',
      meta: { requireAuth: false },
      component: () => import('../views/egg/WelcomeView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      meta: { requireAuth: false },
      component: () => import('../views/devtools/MapGenerator.vue')
    }
  ]
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  // 根据需要进行权限判断
  if (to.meta.requireAuth && !isAuthenticated()) {
    // 如果页面需要登录权限，并且用户未登录，则跳转到登录页面
    next('/login')
  } else {
    // 允许访问页面
    next()
  }
})

const isAuthenticated = () => {
  return !!store.state.jwt
}

export default router
