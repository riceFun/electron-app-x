<template>
  <div class="login-container">
    <h1>Electron 应用登录</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          required
          placeholder="请输入用户名"
        />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
          placeholder="请输入密码"
        />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@renderer/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

interface LoginForm {
  username: string
  password: string
}

const form = ref<LoginForm>({
  username: '',
  password: ''
})

const handleLogin = async () => {
  // 这里可以调用 Electron 主进程进行认证
  // 简单模拟登录成功
  if (form.value.username && form.value.password) {
    authStore.login()
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
/* 样式同上 */
</style>
