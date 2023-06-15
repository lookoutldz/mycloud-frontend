import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import axios from "axios";

axios.defaults.baseURL='/api'

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
    return true
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
