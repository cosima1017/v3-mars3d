<template>
  <div class="text-[#eee]">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
const { title } = defineProps<{
  title: string
}>()
</script>

<style scoped lang="less"></style>
