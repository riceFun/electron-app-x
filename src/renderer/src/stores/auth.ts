import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  // 从 Electron 主进程或本地存储初始化状态
  function init(): void {
    const savedAuth = window.localStorage.getItem('isAuthenticated')
    isAuthenticated.value = savedAuth === 'true'
  }

  function login(): void {
    isAuthenticated.value = true
    window.localStorage.setItem('isAuthenticated', 'true')
  }

  function logout(): void {
    isAuthenticated.value = false
    window.localStorage.removeItem('isAuthenticated')
  }

  return { isAuthenticated, init, login, logout }
})
