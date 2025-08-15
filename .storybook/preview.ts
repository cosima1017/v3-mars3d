import '@/assets/styles/index.scss'
// import Aura from '@primeuix/themes/aura'
import { setup } from '@storybook/vue3'
import type { Preview } from '@storybook/vue3-vite'
import { createPinia } from 'pinia'
// import 'primeicons/primeicons.css'
// import PrimeVue from 'primevue/config'
import 'virtual:uno.css'

setup(app => {
  app.use(createPinia())
  // app.use(PrimeVue, {
  //   theme: {
  //     preset: Aura,
  //     options: {
  //       cssLayer: {
  //         name: 'primevue',
  //         order: 'tailwind-base, primevue, tailwind-utilities'
  //       }
  //     }
  //   }
  // })
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  }
}

export default preview
