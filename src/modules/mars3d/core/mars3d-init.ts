import * as mars3d from 'mars3d'
import 'mars3d-space'
import { addMarker } from '../graphics/marker-graphic'
import '../utils/cesium-enhance'

export let map: mars3d.Map

const { Cesium } = mars3d

/**
 * @description 初始化mars3d
 */
export async function initMars3d() {
  // map = new mars3d.Map('mars3dContainer', {
  //   terrain: mars3d.LayerUtil.createTerrainProvider({
  //     type: 'cesium',
  //     url: 'https://data.mars3d.cn/terrain',
  //     show: true
  //   }),
  //   scene: {
  //     // 默认视角参数
  //     center: {
  //       lat: 23.1291, // 广州纬度
  //       lng: 113.2644, // 广州经度
  //       alt: 1000, // 高度（单位：米）
  //       heading: 0,
  //       pitch: -90
  //     },
  //     sceneMode: 3,
  //     //是否启用日照阴影
  //     shadows: false,
  //     // 移除cesium默认的双击事件
  //     removeDblClick: true,

  //     // cesium.scene对象相关参数
  //     // 是否显示太阳
  //     showSun: false,
  //     // 是否显示月亮
  //     showMoon: false,
  //     // 是否显示大气层
  //     showSkyAtmosphere: false,
  //     // 是否显示天空盒
  //     showSkyBox: false,
  //     // 是否启用雾
  //     fog: false,
  //     // 是否启用抗锯齿
  //     fxaa: false,

  //     // cesium.globe对象相关参数
  //     globe: {
  //       // 是否启用深度检测（启用以更好地显示地形）
  //       depthTestAgainstTerrain: true,
  //       // 是否在地球上绘制地面大气
  //       showGroundAtmosphere: false,
  //       // 是否显示昼夜区域
  //       enableLighting: false
  //     }
  //   },
  //   basemaps: [
  //     // {
  //     //   name: '扬州隧道',
  //     //   type: 'tms',
  //     //   url: 'http://192.168.10.131:8085/UEmap/yangzhousuidao/WGS84_TMS/',
  //     //   rectangle: {
  //     //     xmin: 119.115,
  //     //     xmax: 119.723,
  //     //     ymin: 32.1761,
  //     //     ymax: 32.6433
  //     //   },
  //     //   show: true
  //     // }
  //     { name: '天地图', type: 'tdt', layer: 'img_d', show: true }
  //   ]
  // })
  const mapOptions = await mars3d.Util.fetchJson({
    url: 'map/config/config.json'
  })
  map = new mars3d.Map('mars3dContainer', mapOptions)

  // const token = '661f268b81519597c26b479da66db8f3'
  // const tdtUrl = 'https://t{s}.tianditu.gov.cn/'
  // const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
  // const terrainUrls = []
  // for (let i = 0; i < subdomains.length; i++) {
  //   const url = `${tdtUrl.replace('{s}', subdomains[i])}mapservice/swdx?T=elv_c&tk=${token}`
  //   terrainUrls.push(url)
  // }

  // console.log(terrainUrls)

  // const provider = mars3d.LayerUtil.createTerrainProvider({
  //   url: terrainUrls[0],
  //   show: true
  // })

  // map.terrainProvider = provider

  map.once(mars3d.EventType.load, () => {
    addMarker()
  })

  // map.on(mars3d.EventType.click, (e: mars3d.MapEvent) => {
  //   console.log('单击地图', e)
  // })
}

/**
 * @description 获取当前视角
 * @returns {mars3d.CameraView}
 */
export function getCameraView() {
  return map.getCameraView()
}

/**
 * @description 设置当前视角
 * @param {mars3d.CameraView} cameraView
 * @param {object} options
 * @returns {promise<boolean>}
 */
export function setCameraView(
  cameraView: mars3d.CameraView,
  options?: object = {}
) {
  return map.setCameraView(cameraView, options)
}

/**
 * @description 视角轮巡
 * @param {Array<mars3d.CameraView>} arr
 * @param {object} options
 * @returns {void}
 */
export function setCameraViewList(
  arr: Array<mars3d.CameraView>,
  options?: object = {}
) {
  map.setCameraViewList(arr, options)
}

/**
 * @description 飞回默认视角（一般为初始化的center）
 * @param {object} options 配置参数 duration
 * @param {number} options.duration 飞行时间
 * @returns {void}
 */
export function flyHome(options?: object) {
  map.flyHome(options)
}

/**
 * @description 获取两点之间的距离
 * @param {Cesium.Cartesian3} startPoint 起点
 * @param {Cesium.Cartesian3} endPoint 终点
 * @returns {number} 距离
 */
export function getDistance(
  startPoint: Cesium.Cartesian3,
  endPoint: Cesium.Cartesian3
) {
  return Cesium.Cartesian3.distance(startPoint, endPoint)
}

/**
 * @description 飞行定位至坐标数组处
 * @param {Array<Cesium.Cartesian3>} cartesian 笛卡尔坐标
 * @param {object} options 参数
 * @returns {Promise<boolean>}
 */
export function flyToCartesian(
  cartesian: Array<Cesium.Cartesian3>,
  options?: object
) {
  return map.flyToPositions(cartesian, options)
}

/**
 * @description 视角中心定位至目标点(非相机位置)
 * @param {Cesium.Cartesian3 | mars3d.LngLatPoint | Array<number>} point 坐标
 * @param {object} options 配置参数
 * @returns {Promise<boolean>}
 */
export function flyToPoint(
  point: Array<number> | mars3d.LngLatPoint | Cesium.Cartesian3,
  options?: object
) {
  return map.flyToPoint(point, options)
}
