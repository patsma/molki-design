<script setup>
import { useLoaderStore } from '~/stores/loaderStore';

const loaderStore = useLoaderStore();

// Page initialization
onMounted(() => {
  // Hide loader after initial page load
  if (process.client) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loaderStore.hide();
      }, 200);
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
