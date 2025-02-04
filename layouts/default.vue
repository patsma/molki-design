<script setup>
import { useLoaderStore } from '~/stores/loaderStore';
import { useMenuStore } from '@/stores/menuStore';

const { $gsap, $MorphSVGPlugin } = useNuxtApp();
useHead({
  title: 'Molki Design',
});

const menuStore = useMenuStore();
const loaderStore = useLoaderStore();

// Handle page transitions

// Initialize all required functionality
const initializeApp = () => {
  if (!process.client) return;

  try {
    $MorphSVGPlugin.convertToPath('circle, rect, ellipse, line, polygon, polyline'),
      menuStore.initAnimation($gsap),
      loaderStore.finishLoading();
  } catch (error) {
    console.error('Failed to initialize app:', error);
    loaderStore.finishLoading();
  }
};

onMounted(() => {
  initializeApp();
});

// Watch for route changes
</script>

<template>
  <div>
    <GSAPScrollSmoother>
      <HeaderComponent />
      <Loader />

      <div class="">
        <NuxtPage />
      </div>
    </GSAPScrollSmoother>
  </div>
</template>
