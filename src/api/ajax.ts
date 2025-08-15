import { getToken } from '@/utils/auth'
import { type Method, createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import vueHook from 'alova/vue'

const TOKEN_PREFIX = 'Bearer'
const HTTP_STATUS_ERROR = 400

interface IErrorResponse {
  message?: string
  status?: number
}

class RestError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.status = status
    this.name = 'RestError'
  }
}

function handleError(res: Response, data?: IErrorResponse): never {
  const errorMessage = data?.message || res.statusText
  throw new RestError(errorMessage, res.status)
}

async function handleResponse(res: Response, method: Method) {
  if (res.status >= HTTP_STATUS_ERROR) {
    let data: IErrorResponse | undefined
    try {
      data = await res.json()
    } catch (_) {
      // 如果错误响应体不是JSON，则忽略错误，handleError会使用res.statusText
    }
    handleError(res, data)
  }

  // 根据meta类型处理不同的响应格式
  switch (method.meta?.type) {
    case 'text':
      return res.text()
    case 'blob':
      return res.blob()
  }

  try {
    // 使用clone()避免body已被读取的错误
    const cloneRes = res.clone()
    return await cloneRes.json()
  } catch (e) {
    const contentType = res.headers.get('content-type')
    // console.error(`无法将响应解析为JSON。实际 Content-Type: '${contentType}'. 错误详情:`, e)
    throw new RestError(
      `无法将响应解析为JSON。服务器返回的Content-Type为: ${contentType || '未知'}`
    )
  }
}

export function createAjax(url: string): ReturnType<typeof createAlova> {
  return createAlova({
    requestAdapter: adapterFetch(),
    statesHook: vueHook,
    baseURL: url,
    timeout: 10000,
    beforeRequest: method => {
      const token = getToken()
      if (token) {
        method.config.headers.Authorization = `${TOKEN_PREFIX} ${token}`
      }
    },
    responded: handleResponse,
    cacheLogger: import.meta.env.DEV //开发环境打印缓存日志
  })
}
