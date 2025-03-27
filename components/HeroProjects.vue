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
        <slot name="heroImage" mdc-unwrap="p">
          <!-- Default image -->
          <ParallaxImg
            src="/heroProjects.jpg"
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
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
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
