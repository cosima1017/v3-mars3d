// 节流
export function throttle<T extends (..._args: unknown[]) => unknown>(
  fn: T,
  delay: number
) {
  let lastTime: number = 0
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime > delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}
