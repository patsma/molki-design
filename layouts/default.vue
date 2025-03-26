<script setup>
import { useMenuStore } from '@/stores/menuStore';
import { useAppConfig } from '#app';

const { $gsap } = useNuxtApp();
const menuStore = useMenuStore();
const appConfig = useAppConfig();

// Initialize animations
onMounted(() => {
  if (!process.client) return;

  // Initialize menu animations
  try {
    menuStore.setupMobileMenu();
  } catch (error) {
    console.error('Failed to initialize menu:', error);
  }

  // Simple cookie banner animation
  setTimeout(() => {
    $gsap.to('.cookie-banner', { autoAlpha: 1, duration: 0.8, ease: 'power3.out' });
  }, 2000);
});

// Clean up animations when component is unmounted
onUnmounted(() => {
  if (!process.client) return;

  // Cleanup any global animations if needed
  menuStore.cleanup();
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#b76246" />
    <HeaderComponent />

    <main>
      <NuxtPage />
    </main>

    <div class="cookie-banner fixed opacity-0 invisible bottom-0 left-0 right-0 z-[100]">
      <CookieControl locale="pl" />
    </div>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

/* Pa

/* Cookie banner */
.cookie-banner {
  visibility: hidden;
}
</style>
