import { viteMockServe } from 'vite-plugin-mock'

export default function createMockPlugin() {
  return viteMockServe({
    mockPath: 'mock',
    enable: true
  })
}
