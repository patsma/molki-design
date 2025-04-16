<script setup lang="ts">
// Define props for the component
defineProps<{
  ctaLink?: string;
  heroHeight?: string;
  overlayOpacity?: string;
}>();
</script>

<template>
  <!-- Hero Section -->
  <section class="full-width data-scroll-section relative min-h-[100vh] w-full">
    <!-- Full width background container -->
    <div class="relative">
      <!-- Background image with overlay -->
      <div class="absolute w-full h-full inset-0 z-0 overflow-hidden">
        <div class="absolute inset-0 bg-black/10 z-10"></div>
        <slot name="heroImage">
          <!-- Default image -->
          <ParallaxImg
            src="/heroHome.jpg"
            alt="Full width parallax"
            class="h-full w-full object-cover"
            format="webp"
          />
        </slot>
      </div>

      <!-- SVG Accent Shape -->
      <div class="absolute bottom-0 left-0 overflow-hidden pointer-events-none">
        <HeroPath class="h-screen" />
      </div>

      <!-- Content Container -->
      <div class="content-grid w-full relative z-10 grid min-h-screen text-neutral-100 pb-32">
        <div
          class="breakout1 content-end justify-center items-center justify-items-center grid gap-8"
        >
          <div
            class="grid justify-center items-center content-center font-spartan text-center gap-4"
          >
            <!-- Title -->
            <h1
              class="h1-style font-semibold uppercase"
              v-scroll-anim:fadeUp="{ sequence: true }"
              v-if="$slots.heroTitle"
            >
              <slot name="heroTitle" mdc-unwrap="p" />
            </h1>

            <!-- Subtitle -->
            <h2 class="h2-style font-normal uppercase" v-if="$slots.heroSubtitle">
              <slot name="heroSubtitle" mdc-unwrap="p" />
            </h2>
          </div>
          <!-- CTA Button -->
          <div class="uppercase grid" v-scroll-anim:fadeUp>
            <BaseButton
              v-if="$slots.cta"
              :to="ctaLink || '/'"
              variant="primary"
              size="lg"
              class="tracking-widest font-spartan font-bold"
            >
              <slot name="cta" mdc-unwrap="p" />
            </BaseButton>
          </div>
        </div>
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
