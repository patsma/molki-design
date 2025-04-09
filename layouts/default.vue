<script setup>
import { useMenuStore } from '@/stores/menuStore';

const menuStore = useMenuStore();

// Initialize menu when component is mounted
onMounted(() => {
  if (!process.client) return;
  menuStore.setupMobileMenu();
});

// Clean up when component is unmounted
onUnmounted(() => {
  if (!process.client) return;
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

    <div class="cookie-banner fixed bottom-0 left-0 right-0 z-[100]">
      <CookieControl locale="pl" />
    </div>

    <BackToTop />
  </div>
</template>

<style></style>
