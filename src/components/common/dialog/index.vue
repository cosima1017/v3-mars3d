<template>
  <teleport :to="container">
    <transition name="dialog">
      <div
        v-if="visible"
        :style="{
          width: `${width}px`,
          height: `${height}px`
        }"
        class="dialog-wrapper bg-[#fff] rounded-5"
      >
        <header class="dialog-header relative flex items-center">
          <slot name="header">
            <h3>{{ title }}</h3>
          </slot>
          <button class="dialog-close absolute" @click="close">
            <i class="inline-block iconfont icon-guanbi"></i>
          </button>
        </header>
      </div>
    </transition>
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

function close() {}
</script>

<style scoped lang="scss">
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
}
</style>
