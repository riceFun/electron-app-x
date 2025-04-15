<template>
  <div class="home-container">
    <h1>Test Page</h1>
    <button @click="openChrome">OpenChrome</button>
  </div>
</template>

<script lang="ts" setup>

const openChrome = (): void => {
  console.log('openChrome');
  // 发送消息到主进程
  window.electron.ipcRenderer.send('PULL_DANMU', '渲染进程消息');
}
</script>

<style scoped>
/* 样式同上 */
</style>
