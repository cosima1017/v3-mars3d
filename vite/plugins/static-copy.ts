import { viteStaticCopy } from 'vite-plugin-static-copy'

export default function createStaticCopy() {
  return viteStaticCopy({
    targets: [
      {
        src: 'node_modules/cesium/Build/Cesium/Workers',
        dest: 'cesium'
      },
      {
        src: 'node_modules/cesium/Build/Cesium/ThirdParty',
        dest: 'cesium'
      },
      {
        src: 'node_modules/cesium/Build/Cesium/Assets',
        dest: 'cesium'
      },
      {
        src: 'node_modules/cesium/Build/Cesium/Widgets',
        dest: 'cesium'
      }
    ]
  })
}
