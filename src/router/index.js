import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/welcomeView.vue'),
      // redirect: 'login'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/indexView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/loginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/auth/signupView.vue')
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('../views/auth/resetPasswordView.vue')
    },
  ]
})

export default router
