import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import axios from "axios";
import store from "@/stores";

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
    return localStorage.getItem('jwt')
}

const app = createApp(App)
app.use(createPinia())
app.use(router)
// 在创建 Vue 实例之前，先触发 setIsMobile 这个 action 来设置 isMobile
store.dispatch('setIsMobile').then()
store.dispatch('setDp').then()
app.use(store)
app.mount('#app')
