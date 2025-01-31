<template>
  <div class="content-grid">
    <div class="full-width">
      <!-- Parallax Test Section -->
      <div class="breakout1 h-screen">
        <ParallaxImg
          src="/placeholder.jpg"
          alt="Parallax Test"
          class="h-full w-full"
          format="webp"
          loading="lazy"
        />
      </div>
      <Hero>
        <template #title> umów spotkanie </template>
        <template #subtitle> z projektantką </template>
        <template #cta> umów konsultację </template>
      </Hero>
      <HeroSlider />
      <ContentRenderer v-if="home" :value="home" />
      <div v-else>Home not found</div>

      <div class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
      <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
      <div class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
      <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>
      <div id="spacer1" class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
      <div class="spacer w-full h-screen bg-teal-400" data-speed="1.2"></div>

      <div class="content-grid py-20 space-y-20">
        <!-- Full width example -->
        <div class="breakout1 h-[95vh]">
          <ParallaxImg
            src="/placeholder.jpg"
            alt="Full width parallax"
            class="h-full w-full"
            format="webp"
          />
        </div>

        <!-- Grid layout example -->
        <div class="content-grid gap-y-20">
          <div class="breakout2 h-[60vh]">
            <ParallaxImg src="/placeholder.jpg" alt="Grid item 1" class="h-full w-full" />
          </div>

          <div class="breakout3 h-[80vh]">
            <ParallaxImg src="/placeholder.jpg" alt="Grid item 2" class="h-full w-full" />
          </div>

          <div class="breakout4 h-[70vh]">
            <ParallaxImg
              src="/placeholder.jpg"
              alt="Grid item 3"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue';
import ParallaxImg from '~/components/ParallaxImg.vue';
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first());

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
});
console.log(home.value?.title);
</script>
