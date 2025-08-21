import { MarkerPopup } from '@/components/mars3d'
import { graphicLayer } from '../graphics/marker-graphic'
import { mountVueComponent } from '../utils'

/**
 * @description 弹窗
 *
 */
export function openPopup() {
  if (!graphicLayer) return

  graphicLayer.bindPopup(event => {
    const attr = event.graphic.attr || {}

    if (!attr) return
    const popup = mountVueComponent(MarkerPopup, attr)
    return popup
  })
}
