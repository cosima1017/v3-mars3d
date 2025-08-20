<template>
  <div
    class="marker-container rounded-3 p-2 bg-white h-25 w-45 shadow-2xl relative"
  >
    <header class="flex items-center h-6 w-full">
      <h4>
        {{ name }}
      </h4>
      <i
        class="inline-block absolute right-2 cursor-pointer iconfont icon-guanbi"
        @click="close"
      ></i>
    </header>
  </div>
</template>

<script setup lang="ts">
import { graphicLayer } from '@/modules/cesium'
defineProps<{
  name: string
}>()

function close() {
  const dom = document.querySelector('.marker-container')
  if (!dom) return

  dom.classList.add('closing')

  // 动画结束后更新状态
  setTimeout(() => {
    graphicLayer.closePopup()
  }, 300)
}

function open() {}

defineExpose({
  open
  // close
})
</script>

<style lang="scss" scoped>
.marker-container {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.closing {
  animation: fadeOut 0.3s ease-in-out;
}

@keyframes fadeOut {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
