// import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import type { StorybookConfig } from '@storybook/vue3-vite'
import UnoCSS from 'unocss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  viteFinal: config => {
    config.plugins?.push(UnoCSS())
    // config.plugins?.push(PrimeVueResolver())
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/src'
    }
    return config
  }
}
export default config
