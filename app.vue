<script setup>
import { useLoaderStore } from '~/stores/loaderStore';

const loaderStore = useLoaderStore();
const isAppMounted = ref(false);
const isPageReady = ref(false);
const areImagesLoaded = ref(false);

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
      areImagesLoaded.value = true;
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
            areImagesLoaded.value = true;
            checkAllLoaded();
          }
        };
      }
    });

    // If all images were already loaded
    if (loadedImages === totalImages) {
      areImagesLoaded.value = true;
      checkAllLoaded();
    }
  }
};

// Function to check if everything is loaded
const checkAllLoaded = () => {
  if (isAppMounted.value && isPageReady.value && areImagesLoaded.value) {
    setTimeout(() => {
      loaderStore.hide();
    }, 300);
  }
};

// Watch for all conditions
watch([isAppMounted, isPageReady, areImagesLoaded], () => {
  checkAllLoaded();
});

// Nuxt hooks for loading states
const nuxtApp = useNuxtApp();

// App mounted hook
nuxtApp.hook('app:mounted', () => {
  isAppMounted.value = true;
  checkImagesLoaded(); // Check images after mount
});

// Page finish hook
nuxtApp.hook('page:loading:end', () => {
  console.log('page:loading:end');
  isPageReady.value = true;
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
