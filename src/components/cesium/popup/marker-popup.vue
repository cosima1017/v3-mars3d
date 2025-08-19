<template>
  <div class="marker-container bg-red h-30px w-100px" @click="close"></div>
</template>

<script setup lang="ts">
import { graphicLayer } from '@/modules/cesium'
defineProps<{
  name: string
}>()

function close() {
  console.log('close', graphicLayer)
  graphicLayer.closePopup()
}
</script>

<style lang="scss" scoped></style>
