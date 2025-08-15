import createProxy from './proxy'

/**
 * 创建代理配置
 * @param env 环境变量
 * @param isBuild 是否为构建模式
 * @returns 服务配置对象
 */
export default function createServer(env: any, isBuild: boolean = false) {
  return {
    port: Number(env.VITE_PORT) || 5173,
    host: env.VITE_HOST || '0.0.0.0',
    proxy: createProxy(env, isBuild)
  }
}
