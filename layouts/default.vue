<script setup>
import { useLoaderStore } from '~/stores/loaderStore';
import { useMenuStore } from '@/stores/menuStore';
import { useScrollHeader } from '~/composables/useScrollHeader';
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

// Handle page transitions
const handlePageTransition = async () => {
  console.log('🔄 Layout: Starting page transition');
  cleanup();
  await nextTick();
  initScrollHeader();
};

const initSmoother = async () => {
  if (!process.client) return;

  // Register plugins first
  $gsap.registerPlugin($ScrollTrigger, $ScrollSmoother);

  console.log('🎯 Layout: Initial ScrollSmoother setup');
  smoother = $ScrollSmoother.create({
    wrapper: wrapper.value,
    content: content.value,
    smooth: 1,
    effects: true,
    normalizeScroll: true,
    touchMultiplier: 2,
    ignoreMobileResize: true,
  });
};

// Initialize all required functionality
const initializeApp = async () => {
  if (!process.client) return;

  try {
    await Promise.all([
      $MorphSVGPlugin.convertToPath('circle, rect, ellipse, line, polygon, polyline'),
      initScrollHeader(),
      menuStore.initAnimation($gsap),
      initSmoother(),
    ]);

    // Mark loading as complete after all initializations
    loaderStore.finishLoading();
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Still hide loader even if there's an error
    loaderStore.finishLoading();
  }
};

onMounted(() => {
  initializeApp();
});

onUnmounted(() => {
  if (smoother) {
    smoother.kill();
  }
  if ($ScrollTrigger) {
    $ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
  cleanup();
  menuStore.cleanup();
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
