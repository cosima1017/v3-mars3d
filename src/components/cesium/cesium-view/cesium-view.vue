<template>
  <div id="mars3dContainer" class="mars3d-container" ref="cesiumViewRef"></div>
</template>

<script setup lang="ts">
import { initMars3d } from '@/modules/cesium'
import { onMounted, ref } from 'vue'

const cesiumViewRef = ref<HTMLDivElement>()

onMounted(() => {
  initMars3d()
})
</script>

<style scoped lang="scss">
.mars3d-container {
  width: 100%;
  height: 100vh;
}
</style>
