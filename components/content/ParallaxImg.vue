<template>
  <div class="parallax-wrapper" data-speed="auto">
    <slot>
      <!-- Default slot content -->
      <NuxtImg
        :src="src"
        :alt="alt"
        :format="format"
        :quality="quality"
        :loading="loading"
        class="parallax-content"
      />
    </slot>
  </div>
</template>

<script setup>
// Keep props for default/fallback usage
defineProps({
  src: { type: String, default: '' },
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

.parallax-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
