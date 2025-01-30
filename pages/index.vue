<template>
  <div class="content-grid">
    <div class="full-width">
      <Hero />
      <HeroSlider />
      <ContentRenderer v-if="home" :value="home" />
      <div v-else>Home not found</div>
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
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first());

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
});
console.log(home.value?.title);
</script>
