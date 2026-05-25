import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.md'],
  base: '/gaoxiao-personal-website/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
