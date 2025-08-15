import * as path from 'path'
import { type ConfigEnv, type UserConfig, defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'
import createServer from './vite/server'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const prod = mode === 'production'
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: createVitePlugins(env, prod),
    base: env.VITE_BASE || '/',
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       // javascriptEnabled: true
    //     }
    //   }
    // },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    // define: {
    //   CESIUM_BASE_URL: JSON.stringify('/cesium')
    // },
    // optimizeDeps: {
    //   exclude: ['primeicons']
    // },
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          pure_funcs: ['console.log', 'console.info']
        },
        output: {
          comments: false
        }
      },
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: id => {
            if (id.includes('node_modules')) {
              if (
                id.includes('vue') ||
                id.includes('pinia') ||
                id.includes('vue-router')
              ) {
                return 'vue-vendor'
              }
              if (id.includes('mars3d') || id.includes('turf')) {
                return 'mar3d'
              }
              return 'vendor'
            }
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    server: createServer(env, prod)
  }
})
