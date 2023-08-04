import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import store from "@/stores";



const app = createApp(App)
app.use(createPinia())
app.use(router)
// 在创建 Vue 实例之前，先触发 setIsMobile 这个 action 来设置 isMobile
// store.dispatch('setIsMobile').then()
app.use(store)
app.mount('#app')
