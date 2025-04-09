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
  <section class="full-width relative w-full overflow-hidden">
    <!-- Hero Container -->
    <!-- Full width background container -->
    <div class="relative">
      <!-- Background image with overlay -->
      <div class="absolute w-full h-full inset-0 z-0 overflow-hidden">
        <div
          class="absolute inset-0 z-10"
          :class="overlayOpacity ? overlayOpacity : 'bg-black/30'"
        ></div>
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
          <FullWidthButton v-if="$slots.cta" :to="ctaLink || '/'" color="primary" padding="pb-16">
            <slot name="cta" mdc-unwrap="p" />
          </FullWidthButton>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="full-width-content bg-neutral-400 relative">
      <div class="py-8 pb-10 lg:pb-20 md:py-12 lg:py-16 content-grid">
        <div class="breakout1">
          <!-- Title and Subtitle -->
          <div class="text-center mb-16">
            <h2
              v-if="$slots.title"
              class="h2-style font-semibold text-primary mb-4"
              v-scroll-anim:splitText="{ type: 'words', stagger: 0.1 }"
            >
              <slot name="title" mdc-unwrap="p" />
            </h2>
            <p
              v-if="$slots.subtitle"
              class="text-xl md:text-2xl text-neutral-800"
              v-scroll-anim:fadeUp="{ delay: 0.3 }"
            >
              <slot name="subtitle" mdc-unwrap="p" />
            </p>
          </div>

          <!-- Features Grid -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
            v-if="$slots.features"
            v-scroll-anim:staggerUp="{
              stagger: {
                amount: 0.4,
                from: 'center',
              },
            }"
          >
            <slot name="features">
              <!-- Default features -->
              <Feature v-for="i in 6" :key="i" icon="uil:check-circle" :text="`Feature ${i}`" />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
