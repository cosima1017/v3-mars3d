import * as mars3d from 'mars3d'
const { Cesium } = mars3d

/**
 * @description 经纬度转笛卡尔坐标
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @param {number} alt 高度（默认0）
 * @returns {Cesium.Cartesian3} 笛卡尔坐标
 */
export function lnglat2Cartesian(lng: number, lat: number, alt = 0) {
  return Cesium.Cartesian3.fromDegrees(lng, lat, alt)
}

/**
 * @description 笛卡尔坐标转经纬度
 * @param {Cesium.Cartesian3} cartesian3 笛卡尔坐标
 * @returns {mars3d.LngLatPoint}  {lng, lat, alt} 经纬度对象
 */
export function cartesian2Lnglat(cartesian3: Cesium.Cartesian3) {
  return mars3d.LngLatPoint.fromCartesian(cartesian3)
}

/**
 * @description 经纬度数组转笛卡尔坐标数组
 * @param {Array<mars3d.LngLatPoint>} positions [{ lng, lat, alt }] 经纬度数组
 * @returns {Array<Cesium.Cartesian3>} 笛卡尔坐标数组
 */
export function lnglatArr2CartesianArr(positions: Array<mars3d.LngLatPoint>) {
  return positions.map(pos => {
    const { lng, lat, alt = 0 } = pos
    return lnglat2Cartesian(lng, lat, alt)
  })
}

/**
 * @description 笛卡尔坐标数组转经纬度数组
 * @param {Array<Cesium.Cartesian3>} positions 笛卡尔坐标数组
 * @returns {Array<mars3d.LngLatPoint>} 经纬度数组
 */
export function cartesianArr2LnglatArr(positions: Array<Cesium.Cartesian3>) {
  return positions.map(pos => {
    const { lng, lat, alt } = cartesian2Lnglat(pos)
    return { lng, lat, alt }
  })
}
