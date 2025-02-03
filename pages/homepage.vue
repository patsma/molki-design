<template>
  <div class="content-grid">
    <div class="full-width">
      <Hero data-scroll-section>
        <template #title> umów spotkanie </template>
        <template #subtitle> z projektantką </template>
        <template #cta> umów konsultację </template>
      </Hero>

      <HeroSlider />

      <div id="spacer1" class="spacer w-full h-screen bg-red-400"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue';
</script>
