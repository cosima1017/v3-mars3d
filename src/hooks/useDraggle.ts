import { throttle } from '@/utils'
import { onMounted, reactive } from 'vue'

interface IUseDraggle {
  x: number
  y: number
}

export function useDraggle(
  width: number,
  height: number,
  x: number,
  y: number
) {
  const position = reactive<IUseDraggle>({
    x,
    y
  })
  let isDragging: boolean = false // 是否正在拖拽
  let startX: number = 0 // 起始X坐标
  let startY: number = 0 // 起始Y坐标
  let rafId: number | null = null // 渲染帧ID

  function onMouseDown(e: MouseEvent) {
    isDragging = true
    startX = e.clientX
    startY = e.clientY
    addEventListener('mousemove', onMouseMove)
    addEventListener('mouseup', onMouseUp)
  }

  const updatePosition = throttle((e: MouseEvent) => {
    if (!isDragging) return
    // 计算新位置
    let newX: number = e.clientX - startX
    let newY: number = e.clientY - startY
    // 获取浏览器窗口的宽高
    const { innerWidth, innerHeight } = window
    // 限制拖拽范围
    newX = Math.max(0, Math.min(newX, innerWidth - width))
    newY = Math.max(0, Math.min(newY, innerHeight - height))

    // 使用requestAnimationFrame更新位置
    if (rafId) {
      cancelAnimationFrame(rafId)
    }
    rafId = requestAnimationFrame(() => {
      position.x = newX
      position.y = newY
    })
  }, 16)

  function onMouseMove(e: MouseEvent) {
    updatePosition(e)
  }

  function onMouseUp() {
    isDragging = false
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    removeEventListener('mousemove', onMouseMove)
    removeEventListener('mouseup', onMouseUp)
  }

  onMounted(() => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    position.x = x ? x : (windowWidth - width) / 2
    position.y = y ? y : (windowHeight - height) / 2
  })

  return {
    position,
    onMouseDown
  }
}
