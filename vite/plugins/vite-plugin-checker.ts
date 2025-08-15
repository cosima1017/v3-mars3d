import checker from 'vite-plugin-checker'

export default function createCheckerPlugin() {
  return checker({
    typescript: true,
    vueTsc: true,
    eslint: {
      lintCommand: 'eslint src', // 使用项目根目录的配置文件
      useFlatConfig: true
    }
  })
}
