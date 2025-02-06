<template>
  <div class="parallax-wrapper" data-speed="auto">
    <NuxtImg
      :src="src"
      :alt="alt"
      :format="format || 'webp'"
      :quality="quality || 70"
      :loading="loading || 'lazy'"
      class="parallax-content"
      :class="class"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string;
  alt?: string;
  format?: string;
  quality?: number;
  loading?: string;
  class?: string;
}>();
</script>

<style lang="scss">
.parallax-wrapper {
  height: 120%;
}
</style>
