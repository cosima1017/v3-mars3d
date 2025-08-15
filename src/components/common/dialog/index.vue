<template>
  <teleport :to="container">
    <div
      v-if="visible"
      :style="{
        width: `${width}px`,
        height: `${height}px`
      }"
      class="dialog-wrapper bg-[#fff]"
    >
      <header>
        {{ title }}
      </header>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import type { IDialogProps } from '@/types/dialog.types'

const {
  visible = false,
  title = 'Dialog Popup',
  width = 872,
  height = 596,
  container = 'body'
} = defineProps<IDialogProps>()
// const emit = defineEmits<IDialogEmits>()
</script>

<style scoped lang="less"></style>
