<script setup>
import { useLoaderStore } from '~/stores/loaderStore';

const loaderStore = useLoaderStore();

// Add meta tags for OG Image
useHead({
  meta: [
    {
      property: 'og:site_name',
      content: 'Molki Design',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
});

// Page initialization
onMounted(() => {
  // Hide loader after initial page load
  if (process.client) {
    nextTick(() => {
      loaderStore.hide();
    });
  }
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
