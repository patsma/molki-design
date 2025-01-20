<script setup>
import useTextEffect from "~/composables/useTextEffect";

const { textEffect1Timelines } = useTextEffect(".js--text-effect-101", false);

const title = ref("UMÓW SPOTKANIE");
const subtitle = ref("Z PROJEKTANTKĄ");

onMounted(() => {
  if (textEffect1Timelines.value && textEffect1Timelines.value.length > 0) {
    textEffect1Timelines.value[0].play(); // Play the first timeline
  }
});
</script>

<template>
  <section class="full-width relative min-h-screen w-full">
    <!-- Full width background container -->
    <div class="relative bg-teal-200">
      <!-- Background image with overlay -->
      <div class="absolute w-full h-full inset-0 z-0">
        <div class="absolute inset-0 bg-black/40"></div>
        <img
          src="/placeholder.jpg"
          alt=""
          class="h-full w-full object-cover"
          aria-hidden="true"
        />
      </div>

      <!-- SVG Accent Shape -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden">
        <!-- Place For SVG Path -->
      </div>

      <!-- Content Container -->
      <div
        class="content-grid w-full relative z-10 grid min-h-screen text-neutral-100"
      >
        <div class="breakout1 content-end pb-24">
          <!-- Title with GSAP effect class -->
          <h1
            class="js--text-effect-101 max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          >
            {{ title }}
          </h1>
          <!-- Subtitle -->
          <p class="max-w-2xl text-lg md:text-xl">
            {{ subtitle }}
          </p>
          <!-- CTA Button -->
          <div class="mt-8">
            <button
              class="rounded-md bg-primary px-8 py-3 text-base font-medium text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Rozpocznij projekt
            </button>
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
