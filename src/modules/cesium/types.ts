/**
 * 标记点接口
 */
export interface IMarker {
  /** 标记点ID */
  id: string | number
  /** 标记点名称 */
  name: string
  /** 标记点描述 */
  description?: string
  /** 经度 */
  longitude: number
  /** 纬度 */
  latitude: number
  /** 高度 */
  altitude?: number
  /** 图标URL */
  iconUrl?: string
  /** 图标宽度 */
  iconWidth?: number
  /** 图标高度 */
  iconHeight?: number
}
