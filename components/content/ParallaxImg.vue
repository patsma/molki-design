<template>
  <div class="parallax-wrapper" data-speed="auto">
    <NuxtImg
      :src="src"
      :alt="alt"
      :format="format"
      :quality="quality"
      :loading="loading"
      class="parallax-content"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  format: { type: String, default: 'webp' },
  quality: { type: [String, Number], default: 70 },
  loading: { type: String, default: 'lazy' },
});
</script>

<style lang="scss">
.parallax-wrapper {
  height: 120%;
}
</style>
