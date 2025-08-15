/**
 * @description vue3组件挂载在mars3d的popup
 * @param {*} rootComponent 挂载的组件
 * @param {*} rootProps 传给组件的props
 * @return {*} 组件实例
 */
export function mountVueComponent(rootComponent, rootProps) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const app = createApp(rootComponent, { ...rootProps })
  const instance = app.mount(container)
  return instance
}
