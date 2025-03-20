<script setup lang="ts">
interface Props {
  /**
   * Whether to show the background overlay
   * @default true
   */
  hasOverlay?: boolean;
  /**
   * Background color for the overlay
   * @default 'bg-white'
   */
  overlayColor?: string;
  /**
   * Opacity level for the overlay (10-90)
   * Only used when isSolid is false
   * @default 90
   */
  overlayOpacity?: number;
  /**
   * Whether the overlay should be solid instead of semi-transparent
   * @default false
   */
  isSolid?: boolean;
  /**
   * Additional classes to add to the root section element
   * @default ''
   */
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  hasOverlay: true,
  overlayColor: 'bg-white',
  overlayOpacity: 90,
  isSolid: false,
  className: '',
});

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
  <section
    class="full-width data-scroll-section relative w-full"
    :class="className"
    data-scroll-section
  >
    <!-- Background with overlay -->
    <div v-if="$slots.backgroundImage" class="absolute w-full h-full inset-0 z-0 overflow-hidden">
      <slot name="backgroundImage">
        <!-- Default background image -->
        <ParallaxImg
          src="/preFooterBg.jpg"
          alt="Pricing background"
          class="h-full w-full object-cover"
          format="webp"
        />
      </slot>
      <div
        v-if="hasOverlay"
        class="absolute inset-0 z-10"
        :class="[overlayColor + (isSolid ? '' : '/' + overlayOpacity)]"
      ></div>
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
