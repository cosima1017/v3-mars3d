import type { Meta, StoryObj } from '@storybook/vue3'

import Input from './index.vue'

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: '测试',
    placeholder: '请输入',
    disabled: false,
    type: 'text'
  }
}
