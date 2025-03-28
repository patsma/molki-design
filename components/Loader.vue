<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <div
      v-if="loaderStore.isLoading"
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

const onEnter = (el: Element, done: () => void) => {
  $gsap.set(el, { opacity: 1 });
  done();
};

const onLeave = (el: Element, done: () => void) => {
  $gsap.to(el, {
    opacity: 0,
    duration: 0.5,
    ease: 'sine.in',
    onComplete: done,
  });
};
</script>

<style scoped>
.loader {
  pointer-events: none;
}
</style>
