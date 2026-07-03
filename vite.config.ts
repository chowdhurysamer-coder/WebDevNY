import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Served from the apex custom domain (webdevny.com), so assets live at the
  // site root. (github.io/WebDevNY/ auto-redirects to the custom domain.)
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
