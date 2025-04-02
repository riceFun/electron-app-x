<template>
  <!-- 整个应用的根容器 -->
  <div id="app">
    <!-- 路由匹配的组件会渲染在这里 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    // 可以在这里初始化一些全局逻辑
    return {}
  }
})
</script>

<style>
/* 全局样式 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh; /* 确保全屏高度 */
  overflow: hidden; /* 防止滚动条问题 */
}

/* Electron 窗口拖拽区样式（无边框窗口需要） */
.drag-area {
  -webkit-app-region: drag;
  height: 30px;
  background: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
</style>
