import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-legacy-scripts',
      closeBundle() {
        fs.mkdirSync(resolve(import.meta.dirname, 'dist/js'), { recursive: true })
        fs.copyFileSync(
          resolve(import.meta.dirname, 'js/script.js'),
          resolve(import.meta.dirname, 'dist/js/script.js')
        )
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        gramPanchayat: resolve(import.meta.dirname, 'gram-panchayat.html'),
        cleaningAgent: resolve(import.meta.dirname, 'cleaning-agent.html'),
      },
    },
  },
})


