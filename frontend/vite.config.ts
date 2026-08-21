import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    // Dev-only proxy — in production the built JS uses VITE_API_URL directly
    proxy: command === 'serve' ? {
      '/predict': { target: 'http://127.0.0.1:8000', changeOrigin: true },
      '/health':  { target: 'http://127.0.0.1:8000', changeOrigin: true },
    } : {},
  },
}))
