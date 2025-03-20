<script setup lang="ts">
defineProps<{
  hasBackground?: boolean;
  className?: string;
}>();
</script>

<template>
  <section
    class="title-section text-center py-16 md:py-24"
    :class="[{ 'bg-neutral-400': hasBackground }, className]"
    data-scroll-section
  >
    <div class="content-grid">
      <div class="breakout1">
        <!-- Title -->
        <h2
          v-if="$slots.title"
          class="h2-style text-primary font-semibold text-4xl md:text-5xl mb-6 md:mb-8"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
          data-scroll-position="+=0.5"
        >
          <slot name="title" mdc-unwrap="p" />
        </h2>

        <!-- Subtitle -->
        <div
          v-if="$slots.subtitle"
          class="text-lg md:text-xl text-neutral-600"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
          data-scroll-position="+=0.5"
          data-scroll-delay="0.2"
        >
          <slot name="subtitle" mdc-unwrap="p" />
        </div>
      </div>
    </div>
  </section>
</template>
