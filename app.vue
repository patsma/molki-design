<script setup>
import { useLoaderStore } from '~/stores/loaderStore';

const loaderStore = useLoaderStore();
const { $animations } = useNuxtApp();

// Add meta tags
useHead({
  meta: [
    { property: 'og:site_name', content: 'Molki Design' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
});

// When app is mounted, hide loader and play animations
onMounted(() => {
  if (!process.client) return;

  // Small delay to ensure everything is ready
  setTimeout(() => {
    loaderStore.hideLoader();
    if ($animations?.isPrepared()) {
      $animations.play();
    }
  }, 500);
});
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
