<script setup>
import { useLoaderStore } from '~/stores/loaderStore';

const loaderStore = useLoaderStore();
const { $animations } = useNuxtApp();
const nuxtApp = useNuxtApp();

// Add meta tags
useHead({
  meta: [
    { property: 'og:site_name', content: 'Molki Design' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
});

// Show loader on page navigation
nuxtApp.hook('page:start', () => {
  loaderStore.show();
});

// When animations are prepared, hide loader and then play animations
nuxtApp.hook('animations:prepared', () => {
  // Small delay to ensure everything is mounted
  setTimeout(() => {
    loaderStore.hide();
  }, 100);
});

// Watch loader visibility to trigger animations
watch(
  () => loaderStore.isVisible,
  (isVisible) => {
    if (!isVisible && $animations?.isPrepared()) {
      $animations.play();
    }
  }
);
</script>

<template>
  <div>
    <Loader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<!--suppress CssUnknownTarget -->
<style lang="scss">
@use '~/assets/scss/main.scss';
</style>
