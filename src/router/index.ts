import { setupLayouts } from 'virtual:generated-layouts'
import { type Router, createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE || '/'),
  routes: setupLayouts(routes)
})

export default router
