<script setup lang="ts">
// Define props for the component
defineProps<{
  ctaLink?: string;
}>();
</script>

<template>
  <section class="full-width data-scroll-section relative min-h-[100vh] w-full" data-scroll-section>
    <!-- Full width background container -->
    <div class="relative">
      <!-- Background image with overlay -->
      <div class="absolute w-full h-full inset-0 z-0 overflow-hidden">
        <div class="absolute inset-0 bg-black/30 z-10"></div>
        <slot name="heroImage">
          <!-- Default image -->
          <ParallaxImg
            src="/heroInterior.jpg"
            alt="Full width parallax"
            class="h-full w-full object-cover"
            format="webp"
          />
        </slot>
      </div>

      <!-- SVG Accent Shape -->
      <div class="absolute top-1/2 -left-10 overflow-hidden">
        <HeroPath class="h-screen" />
      </div>

      <!-- Content Container -->
      <div class="full-width w-full relative z-10 grid min-h-screen content-end gap-y-8">
        <!-- Center Button with Line -->
        <div
          class="relative w-full h-full grid place-items-center"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <!-- Decorator Line -->
          <div class="absolute w-screen h-[0.15rem] bg-primary"></div>

          <!-- Button -->
          <NuxtLink
            v-if="$slots.cta"
            class="relative rounded-md cursor-pointer bg-primary px-8 py-5 tracking-widest text-base font-spartan font-bold text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <slot name="cta" mdc-unwrap="p" />
          </NuxtLink>
        </div>

        <!-- Text Box -->
        <div
          class="full-width-content bg-neutral-400/90 relative mb-24"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
          data-scroll-independent="true"
          data-scroll-start="top bottom"
        >
          <div class="py-8 pb-10 lg:pb-20 md:py-12 lg:py-16 content-grid">
            <div class="breakout1">
              <!-- Title -->
              <h2
                v-if="$slots.title"
                class="h2-style font-semibold text-primary text-center mb-8"
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="1"
              >
                <slot name="title" mdc-unwrap="p" />
              </h2>

              <!-- Paragraphs -->
              <div
                class="space-y-4 text-xl md:text-2xl leading-relaxed text-neutral-800"
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="1"
              >
                <slot name="content" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-shape {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}
</style>
