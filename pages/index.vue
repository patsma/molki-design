<template>
  <div class="content-grid">
    <Hero />
    <div class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
    <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
    <div class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
    <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
    <div id="spacer1" class="spacer w-full h-screen bg-red-400" data-speed="1.5" data-section></div>
    <div
      id="spacer3"
      class="spacer w-full h-screen bg-teal-400"
      data-speed="1.2"
      data-section
    ></div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue';
</script>
