import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: 'public',
  server: {
    host: true,
    port: 5173,
    allowedHosts: true
  },
  build: {
    rollupOptions: {
      external: ['react-native-fs']
    }
  },
  optimizeDeps: {
    exclude: ['jsmediatags']
  }
})
