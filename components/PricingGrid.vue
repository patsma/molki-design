<script setup lang="ts">
// Define slots for the component
defineSlots<{
  title?: (props: { mdcUnwrap: string }) => any;
  subtitle?: (props: { mdcUnwrap: string }) => any;
  backgroundImage?: (props: {}) => any;
  columns?: (props: {}) => any;
  infoText?: (props: {}) => any;
}>();
</script>

<template>
  <section class="full-width data-scroll-section relative w-full" data-scroll-section>
    <!-- Background with overlay -->
    <div class="absolute w-full h-full inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 bg-white/10 z-10"></div>
      <slot name="backgroundImage">
        <!-- Default background image -->
        <ParallaxImg
          src="/preFooterBg.jpg"
          alt="Pricing background"
          class="h-full w-full object-cover"
          format="webp"
        />
      </slot>
    </div>

    <div class="relative z-10 w-full">
      <!-- Title Section -->
      <TitleSection v-if="$slots.title || $slots.subtitle">
        <template #title>
          <slot name="title" mdc-unwrap="p" />
        </template>
        <template #subtitle>
          <slot name="subtitle" mdc-unwrap="p" />
        </template>
      </TitleSection>

      <!-- Pricing Grid -->
      <div class="content-grid pb-24">
        <div
          class="breakout1 grid gap-8"
          :class="{
            'md:grid-cols-1': $slots.columns?.().length === 1,
            'md:grid-cols-2': $slots.columns?.().length === 2,
            'md:grid-cols-3': $slots.columns?.().length === 3,
            'md:grid-cols-4': $slots.columns?.().length === 4,
          }"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <slot name="columns" />
        </div>

        <!-- Info Text -->
        <div class="breakout1">
          <div
            v-if="$slots.infoText"
            class="mt-12 w-full text-sm text-neutral-600 mx-auto"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
            data-scroll-delay="0.2"
          >
            <slot name="infoText" mdc-unwrap="p" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prose :deep(ul) {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.prose :deep(li) {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose :deep(li::before) {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary);
}
</style>
