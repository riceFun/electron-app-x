<template>
  <div class="home-container">
    <h1>Electron 应用首页</h1>
    <p>欢迎, {{ username }}!</p>
    <button @click="handleLogout">退出登录</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@renderer/stores/auth'
// import { useAuthStore } from ''

const router = useRouter()
const authStore = useAuthStore()

const username = '管理员' // 可以从状态或主进程获取

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'Login' })
}
</script>

<style scoped>
/* 样式同上 */
</style>
