import type { Meta, StoryObj } from '@storybook/vue3'

import Header from './index.vue'

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '测试'
  }
}
