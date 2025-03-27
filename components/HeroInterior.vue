<script setup lang="ts">
// Define props for the component
defineProps<{
  ctaLink?: string;
  heroHeight?: string; // Add control over the hero height
}>();
</script>

<template>
  <!-- Hero Section -->
  <section class="full-width relative w-full overflow-hidden">
    <!-- Hero Container -->
    <div class="relative w-full" :style="{ height: heroHeight || '80vh' }">
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
      <div class="absolute -top-1/4 -left-10 overflow-hidden">
        <HeroPath class="h-screen" />
      </div>

      <!-- Hero Content Container -->
      <div class="full-width w-full relative z-10 grid h-full content-end">
        <!-- Full Width Button -->
        <FullWidthButton v-if="$slots.cta" :to="ctaLink || '/'" color="primary" padding="pb-16">
          <slot name="cta" mdc-unwrap="p" />
        </FullWidthButton>
      </div>
    </div>

    <!-- Text Box Section -->
    <div class="full-width-content bg-neutral-400/90 relative">
      <div class="py-8 pb-10 lg:pb-20 md:py-12 lg:py-16 content-grid">
        <div class="breakout1">
          <!-- Title -->

          <h2
            v-if="$slots.title"
            class="h2-style font-semibold text-primary text-center mb-8"
            v-scroll-anim:splitText="{ type: 'words', stagger: 0.2 }"
          >
            <slot name="title" mdc-unwrap="p" />
          </h2>

          <!-- Paragraphs -->
          <div
            v-scroll-anim:fadeUp="{ sequence: true }"
            class="space-y-4 text-xl md:text-2xl leading-relaxed text-neutral-800"
          >
            <slot name="content" />
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
