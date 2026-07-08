import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Served from the apex custom domain (webdevny.com), so assets live at the
  // site root. (github.io/WebDevNY/ auto-redirects to the custom domain.)
  base: '/',
  // Ship syntax every still-common engine can parse — newer defaults would
  // hand older Safari/Firefox a syntax error (white screen).
  build: {
    target: ['es2020', 'chrome87', 'edge88', 'firefox78', 'safari14'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
