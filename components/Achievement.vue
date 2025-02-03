<script setup lang="ts">
import FrameCorner from '~/components/FrameCorner.vue';
</script>

<template>
  <div
    class="relative p-8 text-center"
    data-scroll-stagger-group
    data-scroll-animation="fadeUp"
    data-scroll-duration="0.8"
    data-scroll-stagger="0.2"
  >
    <FrameCorner position="top-left" class="scale-75" />
    <h3 class="h3-style font-bold text-primary mb-2">
      <slot name="title" />
    </h3>
    <div class="w-12 h-0.5 bg-primary mx-auto mb-2"></div>
    <p class="body-small">
      <slot name="subtitle" />
    </p>
    <FrameCorner position="bottom-right" class="scale-75" />
  </div>
</template>
