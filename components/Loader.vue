<template>
  <Transition name="fade">
    <div
      v-if="!loaderStore.isHidden"
      class="loader-group bg-secondary grid justify-center fixed z-50 h-screen w-full"
      :class="{ 'loader-group--hidden': !loaderStore.isLoading }"
    >
      <div class="loader grid">
        <LoaderLogo class="w-40" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useLoaderStore } from '~/stores/loaderStore';

const loaderStore = useLoaderStore();
</script>

<style>
.loader-group {
  transition: opacity 0.3s ease-out;
}

.loader-group--hidden {
  opacity: 0;
  pointer-events: none;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
