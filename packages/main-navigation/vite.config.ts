import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5200,
    // proxy: {
    //   '/sapi': {
    //     target: 'http://localhost:1337/api',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/sapi/, '')
    //   }
    // }
  }
})
