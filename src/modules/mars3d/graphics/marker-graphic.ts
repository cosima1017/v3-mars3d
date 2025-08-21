import { getPublicImage } from '@/utils/getPublicAsset'
import * as mars3d from 'mars3d'
import { type IMarker, map, openPopup } from '..'

const { Cesium } = mars3d

export let graphicLayer: mars3d.layer.GraphicLayer

/**
 * @description 添加图标
 * @param {string} name 图标名称
 * @param {string} url 图标地址
 * @param {number} [size=32] 图标大小
 */

export function addMarker() {
  // 如果没有矢量图层则需要创建
  if (!graphicLayer) {
    graphicLayer = new mars3d.layer.GraphicLayer({
      // 如果存在完全坐标相同的图标点，可以打开这个属性
      allowDrillPick: true,
      // 贴地
      clampToGround: true,
      // 聚合
      cluster: {
        enabled: true,
        pixelRange: 50
      },
      popupOptions: {
        // 是否开启点击Map自动关闭popup
        closeOnClick: false
      }
      // pid: 99
    })
    openPopup()
    map.addLayer(graphicLayer)
  }

  createMarker([
    {
      id: 1,
      name: 'marker1',
      longitude: 113.2644,
      latitude: 23.1291,
      altitude: 0
    },
    {
      id: 2,
      name: 'marker2',
      longitude: 113.2644,
      latitude: 23.2291,
      altitude: 0
    }
  ])
}

/**
 * 创建图标
 * @param markers 图标点参数
 */
export function createMarker(markers: IMarker[] | IMarker) {
  if (!markers) return
  const image = getPublicImage('/images/icons/marker.svg')
  const graphics: mars3d.graphic.BillboardEntity[] = []
  if (!Array.isArray(markers)) {
    markers = [markers]
  }
  markers.forEach(marker => {
    const graphic = new mars3d.graphic.BillboardEntity({
      position: [marker.longitude, marker.latitude, marker.altitude ?? 0],
      style: {
        image: marker.iconUrl || image,
        width: marker.iconWidth || 48,
        height: marker.iconHeight || 57,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      },
      attr: {
        name: '示例'
      }
    })
    graphics.push(graphic)
    console.log(graphic)
  })

  graphicLayer.addGraphic(graphics)
}

export function removeGraphic() {
  if (!map) return
  graphicLayer.remove()
  map.removeLayer(graphicLayer)
}
