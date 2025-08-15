import { getImageUrl } from '@/utils/url'
import * as mars3d from 'mars3d'
// import { map } from '..'
import { map, openPopup } from '..'

const { Cesium } = mars3d

export let graphicLayer: mars3d.layer.GraphicLayer

/**
 * @description 添加图标
 * @param {string} name 图标名称
 * @param {string} url 图标地址
 * @param {number} [size=32] 图标大小
 */

export function addImageMarker() {
  // 如果没有矢量图层则需要创建
  if (!graphicLayer) {
    graphicLayer = new mars3d.layer.GraphicLayer({
      // 如果存在完全坐标相同的图标点，可以打开这个属性
      allowDrillPick: true,
      // 贴地
      clampToGround: true
    })
    map.addLayer(graphicLayer)
    // 在layer绑定监听事件
    graphicLayer.on(mars3d.EventType.click, (e: any) => {
      console.log('单击了图标点', e)
    })
  }

  openPopup()
  creatImageMarker()
}

export function creatImageMarker() {
  const image = getImageUrl('map/markers/marker.svg')
  const graphic = new mars3d.graphic.BillboardEntity({
    position: [113.2644, 23.1291],
    style: {
      image,
      width: 48,
      height: 57,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    },
    attr: {
      name: '图标点'
    }
  })
  graphicLayer.addGraphic(graphic)
}
