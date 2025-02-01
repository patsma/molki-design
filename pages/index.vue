<template>
  <div class="content-grid">
    <div class="full-width">
      <Hero data-scroll-section>
        <template #title> umów spotkanie </template>
        <template #subtitle> z projektantką </template>
        <template #cta> umów konsultację </template>
      </Hero>

      <HeroSlider  />
      <ContentRenderer v-if="home" :value="home" />
      <div v-else>Home not found</div>

      <div class="spacer w-full h-screen bg-red-400"></div>
      <div class="grid h-[55vh] overflow-hidden">
        <ParallaxImg
          src="/placeholder.jpg"
          alt="Full width parallax"
          class="h-full w-full"
          format="webp"
        />
      </div>
      <div class="spacer w-full h-screen bg-teal-400"></div>
      <div class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
      <div class="spacer w-full h-screen bg-teal-400"></div>
      <div id="spacer1" class="spacer w-full h-screen bg-red-400" data-speed="1.5"></div>
      <div class="spacer w-full h-screen bg-teal-400"></div>

      <!-- Animation Test Section -->
      <section data-scroll-section class="py-20">
        <!-- FadeIn with custom duration -->
        <h2
          data-scroll-item
          data-scroll-animation="fadeIn"
          data-scroll-duration="1.2"
          class="text-4xl mb-12"
        >
          Our Services
        </h2>

        <!-- FadeUp with stagger group -->
        <div
          data-scroll-stagger-group
          data-scroll-animation="fadeUp"
          data-scroll-duration="0.8"
          data-scroll-stagger="0.2"
          class="grid grid-cols-3 gap-8"
        >
          <div class="p-6 bg-white/10 backdrop-blur-lg rounded-lg">
            <h3 class="text-xl mb-4">Web Design</h3>
            <p>Custom digital experiences</p>
          </div>
          <div class="p-6 bg-white/10 backdrop-blur-lg rounded-lg">
            <h3 class="text-xl mb-4">Branding</h3>
            <p>Visual identity systems</p>
          </div>
          <div class="p-6 bg-white/10 backdrop-blur-lg rounded-lg">
            <h3 class="text-xl mb-4">Strategy</h3>
            <p>Data-driven decisions</p>
          </div>
        </div>

        <!-- SplitText animation -->
        <p
          data-scroll-item
          data-scroll-animation="splitText"
          data-scroll-duration="1.5"
          class="text-lg mt-20 max-w-2xl mx-auto"
        >
          Transforming ideas into <u>digital experiences</u> that captivate and engage.
        </p>

        <!-- Independent animation -->
        <div
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="0.8"
          data-scroll-independent="true"
          data-scroll-start="top center"
          class="mt-20 p-8 bg-primary/20 rounded-xl"
        >
          <h3 class="text-xl mb-4">Special Offer</h3>
          <p>Limited time consultation package</p>
        </div>
      </section>
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
