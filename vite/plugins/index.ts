import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRouter from 'unplugin-vue-router/vite'
import type { ImportMetaEnv } from 'vite'
import InSpect from 'vite-plugin-inspect'
import { mars3dPlugin } from 'vite-plugin-mars3d'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import createAutoImport from './auto-import'
import createComponents from './components'
import createCompression from './compression'
// import createStaticCopy from './static-copy'
import createVisualizer from './visualizer'
import createHtmlPlugin from './vite-html'
import createCheckerPlugin from './vite-plugin-checker'
import createMockPlugin from './vite-plugin-mock'
export default function createVitePlugins(
  viteEnv: ImportMetaEnv,
  isBuild: boolean = false
) {
  const vitePlugins = [
    VueRouter(),
    Layouts(),
    VueDevTools(),
    VueMacros({
      plugins: {
        vue: vue()
      }
    }),
    createMockPlugin(),
    createCheckerPlugin(),
    createAutoImport(),
    InSpect(),
    createCompression(isBuild),
    UnoCSS(),
    createComponents(),
    createHtmlPlugin(viteEnv, isBuild),
    // createStaticCopy(),
    mars3dPlugin()
  ]
  if (isBuild) {
    vitePlugins.push(createVisualizer())
  }

  return vitePlugins
}
