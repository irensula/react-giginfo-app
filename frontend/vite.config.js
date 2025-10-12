import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api/gigs': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/login': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/register': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/gigs/*': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  }
})