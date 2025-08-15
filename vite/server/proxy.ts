import type { ProxyOptions } from 'vite'

/**
 * 创建代理配置
 * @param env 环境变量
 * @param isBuild 是否为构建模式
 * @returns 代理配置对象
 */
export default function createProxy(
  env: any,
  isBuild = false
): Record<string, ProxyOptions> {
  // 构建模式下不需要代理
  if (isBuild) {
    return {}
  }

  const proxyConfig: Record<string, ProxyOptions> = {}
  const PROXY_PREFIX = 'VITE_PROXY_'

  // 筛选并处理代理环境变量
  Object.entries(env)
    .filter(([key]) => key.startsWith(PROXY_PREFIX))
    .forEach(([key, target]) => {
      if (!target) return

      const prefix = key.replace(PROXY_PREFIX, '').toLowerCase()

      proxyConfig[`/${prefix}`] = {
        target,
        changeOrigin: true,
        secure: false,
        ws: typeof target === 'string' && target.includes('ws'),
        rewrite: path => path.replace(new RegExp(`^/${prefix}`), '')
      }
    })

  return proxyConfig
}
