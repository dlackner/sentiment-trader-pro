import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './src/client',
  build: {
    outDir: '../../dist'
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true
      },
      '/socket.io': {
        target: 'http://localhost:5002',
        ws: true
      }
    }
  }
})