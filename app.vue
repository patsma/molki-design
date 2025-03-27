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

// Function to check if all images are loaded
const checkImagesLoaded = () => {
  if (process.client) {
    const images = document.getElementsByTagName('img');
    const totalImages = images.length;
    let loadedImages = 0;

    // If no images, mark as loaded
    if (totalImages === 0) {
      loaderStore.setImagesLoaded();
      return;
    }

    // Check each image
    Array.from(images).forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            loaderStore.setImagesLoaded();
          }
        };
      }
    });

    // If all images were already loaded
    if (loadedImages === totalImages) {
      loaderStore.setImagesLoaded();
    }
  }
};

// Nuxt hooks for loading states
const nuxtApp = useNuxtApp();

// App mounted hook
nuxtApp.hook('app:mounted', () => {
  loaderStore.setAppMounted();
  checkImagesLoaded(); // Check images after mount
});

// Page finish hook
nuxtApp.hook('page:finish', () => {
  console.log('page:finish hook triggered');
  loaderStore.setPageReady();
  checkImagesLoaded(); // Recheck images after page components are loaded
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
