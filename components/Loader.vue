<template>
  <Transition name="fade">
    <div
      v-if="loaderStore.isActive"
      class="loader fixed inset-0 z-50 flex items-center justify-center bg-secondary"
    >
      <LoaderLogo class="w-40" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useLoaderStore } from '~/stores/loaderStore';

const loaderStore = useLoaderStore();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  /* Match the page transition timing for consistent experience */
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
