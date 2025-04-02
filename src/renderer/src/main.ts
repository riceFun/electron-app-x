import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@renderer/router'
import { useAuthStore } from '@renderer/stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 初始化认证状态
const authStore = useAuthStore()
authStore.init()

app.mount('#app')
