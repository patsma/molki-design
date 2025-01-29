<template>
  <div class="content-grid">
    <div class="full-width">
      <Hero v-if="pageData?.hero" :data="pageData.hero" />
      <HeroSlider v-if="pageData?.heroSlider" :data="pageData" :key="'hero-slider'" />
      <div class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
      <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
      <div class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
      <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
      <div id="spacer1" class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
      <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue';
import HeroSlider from '~/components/HeroSlider/HeroSlider.vue';

// Fetch the index page content with debug logs
const { data: pageData } = await useAsyncData('index', async () => {
  console.log('🔄 Index: Fetching content');
  const data = await queryContent('/').findOne();
  console.log('📦 Index: Content received:', data);
  return data;
});

// Watch for data changes
watch(pageData, (newVal) => {
  console.log('👀 Index: pageData updated:', newVal);
});

onMounted(() => {
  console.log('🎯 Index: Component mounted, pageData:', pageData.value);
});
</script>
