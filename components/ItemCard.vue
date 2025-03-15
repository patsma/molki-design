<script setup lang="ts">
defineProps<{
  ctaLink?: string;
}>();
</script>

<template>
  <div class="item-card relative" data-scroll-section>
    <!-- Image Container -->
    <div class="relative aspect-[16/9] overflow-hidden">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/30 z-10"></div>

      <!-- Image Slot -->
      <slot name="image">
        <!-- Default image -->
        <ParallaxImg>
          <nuxt-img
            src="/heroHome.jpg"
            alt="Item card image"
            class="parallax-content"
            format="webp"
          />
        </ParallaxImg>
      </slot>

      <!-- Accent Shape -->
      <slot name="accent-shape">
        <div class="absolute -bottom-1 left-0 overflow-hidden z-20">
          <HeroPath class="h-[200%] opacity-50" />
        </div>
      </slot>
    </div>

    <!-- Text Box -->
    <div
      class="relative bg-neutral-400 p-8 md:p-12"
      data-scroll-item
      data-scroll-animation="fadeUp"
      data-scroll-duration="1"
    >
      <div class="w-full">
        <!-- Title -->
        <h3 v-if="$slots.title" class="text-2xl md:text-3xl font-semibold text-primary mb-4">
          <slot mdc-unwrap="p" name="title"></slot>
        </h3>

        <!-- Content -->
        <div class="text-2xl text-neutral-600 mb-6">
          <slot mdc-unwrap="p" name="content" />
        </div>

        <!-- Link -->
        <NuxtLink
          v-if="$slots.cta"
          :to="ctaLink || '/'"
          class="inline-block text-primary font-medium hover:text-primary-dark transition-colors duration-200"
        >
          <slot mdc-unwrap="p" name="cta"></slot>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
