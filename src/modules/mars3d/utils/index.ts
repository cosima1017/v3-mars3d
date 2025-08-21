import { type Component, createApp } from 'vue'
/**
 * @description vue3组件挂载在mars3d的popup
 * @param {*} rootComponent 挂载的组件
 * @param {*} rootProps 传给组件的props
 * @return {*} 组件实例
 */
export function mountVueComponent(
  rootComponent: Component,
  rootProps?: object
) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const app = createApp(rootComponent, { ...rootProps })
  app.mount(container)
  return app._container
}
