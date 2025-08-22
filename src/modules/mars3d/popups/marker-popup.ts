import { MarkerPopup } from '@/components/mars3d'
import type * as mars3d from 'mars3d'
import { flyToPoint, getDistance } from '../core/mars3d-init'
import { graphicLayer } from '../graphics/marker-graphic'
import { mountVueComponent } from '../utils'

/**
 * @description 弹窗
 *
 */
export function openPopup() {
  if (!graphicLayer) return

  graphicLayer.bindPopup(event => {
    const { graphic } = event
    const cluster = graphic?.cluster
    if (cluster) {
      return clickCluster(graphic)
    }

    const attr = event.graphic.attr || {}

    if (!attr) return
    const popup = mountVueComponent(MarkerPopup, attr)
    return popup
  })
}

function clickCluster(graphic: mars3d.graphic.Graphic) {
  // 获取当前聚合距离和聚合点位集合
  const { position, graphics } = graphic

  // 计算所有点到中心点的最大距离
  let maxDistance = 0
  graphics.forEach(item => {
    const distance = getDistance(position, item.position)
    if (distance > maxDistance) {
      maxDistance = distance
    }
  })
  // 增加视图边距，确保显示
  // 动态计算 radius，确保聚合点清晰可见
  // 根据点的数量调整视图范围
  const pointCountFactor = Math.log(graphics.length + 1) // 点越多，视图范围稍大
  const radius = Math.max(maxDistance * 10 * pointCountFactor, 800)
  flyToPoint(position, {
    radius,
    duration: 2
  })
}
