/**
 * 获取public目录中的资源路径，自动处理base配置
 * @param path - 相对于public目录的路径，以'/'开头
 * @returns 完整的资源路径
 */
export function getPublicAsset(path: string): string {
  // 确保路径以'/'开头
  if (!path.startsWith('/')) {
    path = `/${path}`
  }

  // 在开发环境和生产环境中都能正确处理base路径
  const base = import.meta.env.BASE_URL || '/'

  // 移除base末尾的'/'以避免重复
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base

  return normalizedBase + path
}

/**
 * 专门用于获取图片资源的方法
 * @param imagePath - 图片相对路径，如 'images/logo.png'
 * @returns 完整的图片路径
 */
export function getPublicImage(imagePath: string): string {
  // 如果路径不以'/'开头，自动添加
  const fullPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  return getPublicAsset(fullPath)
}

/**
 * 获取带有回退机制的图片路径
 * @param imagePath - 主图片路径
 * @param fallbackPath - 备用图片路径
 * @returns 可用的图片路径
 */
export async function getPublicImageWithFallback(
  imagePath: string,
  fallbackPath: string = '/images/marker.svg'
): Promise<string> {
  const primaryPath = getPublicImage(imagePath)

  try {
    // 检查图片是否存在
    const response = await fetch(primaryPath, { method: 'HEAD' })
    if (response.ok) {
      return primaryPath
    }
  } catch (error) {
    console.warn(`Failed to load image: ${primaryPath}`, error)
  }

  return getPublicImage(fallbackPath)
}

/**
 * 批量获取多个图片路径
 * @param imagePaths - 图片路径数组
 * @returns 完整图片路径数组
 */
export function getPublicImages(imagePaths: string[]): string[] {
  return imagePaths.map(path => getPublicImage(path))
}
