import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:true,
    proxy:{
      '/api':{
        target:'http://116.202.210.102:3002',
      }
    }
  },
  plugins: [react()],
})
