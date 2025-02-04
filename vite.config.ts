import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: './.vite',
  resolve: {
    alias: [
      {find: '@components', replacement: '/src/components'},
      {find: '@', replacement: '/src'},
    ],
  },
  build: {
    outDir: './dist',
  },
})
