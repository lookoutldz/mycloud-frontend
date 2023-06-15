import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      meta: { requireAuth: true },
      component: () => import('../views/indexView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/loginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/registerView.vue')
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('../views/auth/resetPasswordView.vue')
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('../views/welcomeView.vue'),
    },
  ]
})

export default router
