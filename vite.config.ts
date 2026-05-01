import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// GitHub Pages 部署到 https://<user>.github.io/keer_huabei/
// 因此生产环境需要设置 base 为 /keer_huabei/，本地开发保持 /
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/keer_huabei/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
}))
