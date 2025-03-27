<script setup>
import { useLoaderStore } from '~/stores/loaderStore';

const loaderStore = useLoaderStore();
const nuxtApp = useNuxtApp();
const { $animations } = useNuxtApp();

// Add meta tags
useHead({
  meta: [
    { property: 'og:site_name', content: 'Molki Design' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
});

// Simple image loading check
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
        // Handle image load errors
        img.onerror = () => {
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

// ============= HOOKS =============

// Add router navigation guards to show loader immediately
const router = useRouter();
router.beforeEach((to, from, next) => {
  loaderStore.reset();
  next();
});

// When animations are prepared, set content as ready
nuxtApp.hook('animations:prepared', () => {
  loaderStore.setContentReady();
});

// When loader disappears, play animations
watch(
  () => loaderStore.isActive,
  (isActive) => {
    if (!isActive && $animations && $animations.isPrepared()) {
      $animations.play();
    }
  }
);

// App mounted hook
nuxtApp.hook('app:mounted', () => {
  checkImagesLoaded();
});

// Page finish hook
nuxtApp.hook('page:finish', () => {
  checkImagesLoaded();
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
