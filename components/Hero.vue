<script setup>
import useTextEffect from '~/composables/useTextEffect';

const { textEffect1Timelines } = useTextEffect('.js--text-effect-101', false);

const title = ref('UMÓW SPOTKANIE');
const subtitle = ref('Z PROJEKTANTKĄ');

onMounted(() => {
  if (textEffect1Timelines.value && textEffect1Timelines.value.length > 0) {
    textEffect1Timelines.value[0].play(); // Play the first timeline
  }
});
</script>

<template>
  <section class="full-width relative min-h-[100vh] w-full">
    <!-- Full width background container -->
    <div class="relative">
      <!-- Background image with overlay -->
      <div class="absolute w-full h-full inset-0 z-0">
        <div class="absolute inset-0 bg-black/30"></div>
        <NuxtImg
          src="/heroHome.jpg"
          alt="Interior design hero background"
          class="h-full w-full object-cover"
          loading="eager"
          placeholder
          format="webp"
          quality="90"
          aria-hidden="true"
        />
      </div>

      <!-- SVG Accent Shape -->
      <div class="absolute bottom-0 left-0 overflow-hidden">
        <HeroPath class="h-screen" />
      </div>

      <!-- Content Container -->
      <div class="content-grid w-full relative z-10 grid min-h-screen text-neutral-100 pb-32">
        <div
          data-speed="1.15"
          class="breakout1 content-end justify-center items-center justify-items-center grid gap-8"
        >
          <!-- js--text-effect-101 -->
          <!-- Title with GSAP effect class -->
          <div
            class="grid justify-center items-center content-center font-spartan text-center gap-4"
          >
            <h1 class="h1-style font-semibold">
              {{ title }}
            </h1>
            <!-- Subtitle -->
            <h2 class="h2-style font-normal">
              {{ subtitle }}
            </h2>
          </div>
          <!-- CTA Button -->
          <div class="uppercase grid">
            <NuxtLink
              to="/buttons"
              class="rounded-md bg-primary px-8 py-5 tracking-widest text-base font-spartan font-bold text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Rozpocznij projekt"
            >
              Umów konsultację
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.hero-shape {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}
</style>
