import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        // '@': resolve('src')
        '@renderer': resolve('src/renderer/src')
        // '@renderer': resolve('src/renderer')
      }
    },
    plugins: [vue()]
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@/styles/variables.scss";`
  //     }
  //   }
  // }
})
