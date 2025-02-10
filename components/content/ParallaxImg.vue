<template>
  <div class="parallax-wrapper" data-speed="auto">
    <slot>
      <!-- This will be replaced by the editor's image -->
    </slot>
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

:deep(.parallax-content) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
