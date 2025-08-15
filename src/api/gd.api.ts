/**
 * 高德地图API
 */
import type { IGdWeatherRes } from '@/types'
import { createAjax } from './ajax'

// 创建高德API实例
const gdApi = createAjax(import.meta.env.VITE_GD_API || '/gd')

// 高德API密钥
const GD_KEY = import.meta.env.VITE_GD_KEY

/**
 * 高德API请求参数接口
 */
interface IGdBaseParams {
  key?: string
  output?: 'JSON' | 'XML'
}

/**
 * 天气查询参数接口
 */
interface IGdWeatherParams extends IGdBaseParams {
  city: string
  extensions?: 'base' | 'all'
}

/**
 * 设置公共参数
 * @param params 原始参数
 * @returns 添加了公共参数的对象
 */
function setCommonParams<T extends IGdBaseParams>(params: T): T {
  return { key: GD_KEY, ...params }
}

/**
 * 高德地图API服务
 */
export const gdMapService = {
  /**
   * 获取天气信息
   * @param params 天气查询参数
   * @returns 天气信息响应
   */
  getWeather(params: IGdWeatherParams): Promise<IGdWeatherRes> {
    const newParams = setCommonParams(params)
    return gdApi.Get('/v3/weather/weatherInfo', {
      params: newParams
    })
  }
}
