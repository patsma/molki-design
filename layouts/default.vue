<script setup>
import { useLoaderStore } from '~/stores/loaderStore';
import { useMenuStore } from '@/stores/menuStore';
import { useScrollHeader } from '~/composables/useScrollHeader';
import { useMobileDetection } from '~/composables/useMobileDetection';
const { $gsap, $ScrollTrigger, $ScrollSmoother, $MorphSVGPlugin } = useNuxtApp();
useHead({
  title: 'Molki Design',
});

const wrapper = ref(null);
const content = ref(null);
let smoother = null;
const menuStore = useMenuStore();
const { initScrollHeader, cleanup } = useScrollHeader('.nav');
const loaderStore = useLoaderStore();
const { isMobile } = useMobileDetection();

// Handle page transitions
const handlePageTransition = async () => {
  console.log('🔄 Layout: Starting page transition');
  cleanup();
  await nextTick();
  initScrollHeader();
};

// Initialize all required functionality
const initializeApp = async () => {
  if (!process.client) return;

  try {
    await Promise.all([
      $MorphSVGPlugin.convertToPath('circle, rect, ellipse, line, polygon, polyline'),
      menuStore.initAnimation($gsap),
    ]);

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
const route = useRoute();
watch(() => route.path, handlePageTransition);
</script>

<template>
  <div>
    <Loader />
    <GSAPScrollSmoother>
      <HeaderComponent />
      <div class="">
        <NuxtPage />
      </div>
    </GSAPScrollSmoother>
  </div>
</template>
