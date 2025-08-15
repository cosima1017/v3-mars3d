/**
 * 获取assets/images目录下的图片
 * @param name - 图片在images目录下的相对路径，例如: 'map/markers/marker.png'
 * @returns 图片URL或空字符串（如果图片不存在）
 */

// 缓存已加载的图片模块
const imageModules = import.meta.glob('@/assets/images/**/*', { eager: true })

// 缓存已解析的图片URL
const imageUrlCache = new Map<string, string>()

export function getImageUrl(name: string): string {
  // 检查缓存中是否已有此图片URL
  if (imageUrlCache.has(name)) {
    return imageUrlCache.get(name) || ''
  }

  try {
    // 标准化路径，移除开头的斜杠
    const normalizedName = name.startsWith('/') ? name.slice(1) : name

    // 构建完整路径
    const path = `/src/assets/images/${normalizedName}`

    // 获取图片URL
    const imageUrl = imageModules[path]?.default || ''
    // 缓存结果
    imageUrlCache.set(name, imageUrl)

    return imageUrl
  } catch {
    // 缓存失败结果，避免重复尝试失败的路径
    imageUrlCache.set(name, '')
    return ''
  }
}
