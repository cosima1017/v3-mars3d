import type { ImportMetaEnv } from 'vite'
import { createHtmlPlugin as _createHtmlPlugin } from 'vite-plugin-html'
export default function createHtmlPlugin(
  env: ImportMetaEnv,
  isBuild: boolean = false
) {
  const { VITE_APP_TITLE } = env

  const htmlPlugin = _createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_APP_TITLE || 'V3 CESIUM'
      }
    }
  })
  return htmlPlugin
}
