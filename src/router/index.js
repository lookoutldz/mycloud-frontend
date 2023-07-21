import { createRouter, createWebHistory } from 'vue-router'

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
      }]
    },
    {
      path: '/welcome',
      name: 'welcome',
      meta: { requireAuth: false },
      component: () => import('../views/egg/welcomeView.vue'),
    },
  ]
})

export default router
