<script setup>
import { useLoaderStore } from '~/stores/loaderStore';
import { useMenuStore } from '@/stores/menuStore';
import { useAppConfig } from '#app';

const { $gsap } = useNuxtApp();
const menuStore = useMenuStore();
const loaderStore = useLoaderStore();
const appConfig = useAppConfig();

// Initialize app
const initializeApp = () => {
  if (!process.client) return;

  try {
    menuStore.initAnimation($gsap);
  } catch (error) {
    console.error('Failed to initialize app:', error);
    loaderStore.finishLoading();
  }
};

onMounted(() => {
  initializeApp();

  // Simple cookie banner animation
  if (process.client) {
    const interval = setInterval(() => {
      if (!loaderStore.isLoading) {
        clearInterval(interval);
        setTimeout(() => {
          $gsap.to('.cookie-banner', { autoAlpha: 1, duration: 0.8, ease: 'power3.out' });
        }, 2000);
      }
    }, 100);
  }
});
</script>

<template>
  <div>
    <GSAPScrollSmoother>
      <HeaderComponent />
      <Loader />

      <div class="">
        <NuxtPage />

        <!-- Pre-Footer Section -->
      </div>

      <!-- Cookie Control Banner -->
    </GSAPScrollSmoother>

    <div class="cookie-banner fixed opacity-0 bottom-0 left-0 right-0 z-[100]">
      <CookieControl locale="pl" />
    </div>
  </div>
</template>
