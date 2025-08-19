import * as mars3d from 'mars3d'
import 'mars3d-space'
import { addMarker } from '../graphics/marker-graphic'
import '../utils/cesium-enhance'

export let map: mars3d.Map

export function initMars3d() {
  // map = new mars3d.Map('mars3dContainer', {
  //   scene: {
  //     center: {
  //       lat: 31.765,
  //       lng: 117.212,
  //       alt: 1000,
  //       heading: 0,
  //       pitch: -20
  //     }
  //   },
  //   control: {
  //     baseLayerPicker: false
  //   }
  // })

  map = new mars3d.Map('mars3dContainer', {
    terrain: mars3d.LayerUtil.createTerrainProvider({
      type: 'cesium',
      url: 'http://data.mars3d.cn/terrain',
      show: true
    }),
    scene: {
      // 默认视角参数
      center: {
        lat: 23.1291, // 广州纬度
        lng: 113.2644, // 广州经度
        alt: 1000, // 高度（单位：米）
        heading: 0,
        pitch: -90
      },
      sceneMode: 3,
      //是否启用日照阴影
      shadows: false,
      // 移除cesium默认的双击事件
      removeDblClick: true,

      // cesium.scene对象相关参数
      // 是否显示太阳
      showSun: false,
      // 是否显示月亮
      showMoon: false,
      // 是否显示大气层
      showSkyAtmosphere: false,
      // 是否显示天空盒
      showSkyBox: false,
      // 是否启用雾
      fog: false,
      // 是否启用抗锯齿
      fxaa: false,

      // cesium.globe对象相关参数
      globe: {
        // 是否启用深度检测
        depthTestAgainstTerrain: false,
        // 是否在地球上绘制地面大气
        showGroundAtmosphere: false,
        // 是否显示昼夜区域
        enableLighting: false
      }
    },
    basemaps: [
      // {
      //   name: '扬州隧道',
      //   type: 'tms',
      //   url: 'http://192.168.10.131:8085/UEmap/yangzhousuidao/WGS84_TMS/',
      //   rectangle: {
      //     xmin: 119.115,
      //     xmax: 119.723,
      //     ymin: 32.1761,
      //     ymax: 32.6433
      //   },
      //   show: true
      // }
      { name: '天地图', type: 'tdt', layer: 'img_d', show: true }
    ]
  })

  map.once(mars3d.EventType.load, () => {
    addMarker()
  })
}
