import { defineConfig } from 'vite'
import react            from '@vitejs/plugin-react'
import tailwindcss      from '@tailwindcss/vite'
import path             from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/portfolio/",
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react') || id.includes('react-dom')) return 'react-vendor'
          if (id.includes('framer-motion')) return 'framer-motion'
        },
      },
    },
  },
})