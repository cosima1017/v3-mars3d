import compression from 'vite-plugin-compression'

export default function createCompression(isBuild: boolean = false) {
  return compression({
    verbose: isBuild, // 是否在控制台输出压缩结果
    disable: false, // 开启压缩（不禁用），默认即可
    deleteOriginFile: false, // 删除源文件
    threshold: 5120, // 压缩前最小文件大小
    algorithm: 'gzip', // 压缩算法
    ext: '.gz' // 文件类型
  })
}
