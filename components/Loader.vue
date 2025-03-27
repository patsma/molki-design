<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
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
const { $gsap } = useNuxtApp();

// Handle enter transition - appear immediately when navigating
const onEnter = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement;
  $gsap.set(htmlEl, { opacity: 1 });
  done();
};

// Handle leave transition - fade out smoothly
const onLeave = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement;
  $gsap.to(htmlEl, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: done,
  });
};
</script>

<style scoped>
.loader {
  pointer-events: none;
}
</style>
