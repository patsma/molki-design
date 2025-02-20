<script setup lang="ts">
// Define slots for the component
defineSlots<{
  title?: (props: { mdcUnwrap: string }) => any;
  subtitle?: (props: { mdcUnwrap: string }) => any;
  backgroundImage?: (props: {}) => any;
  // Column slots
  basicTitle?: (props: { mdcUnwrap: string }) => any;
  basicPrice?: (props: { mdcUnwrap: string }) => any;
  basicFeatures?: (props: {}) => any;
  comfortTitle?: (props: { mdcUnwrap: string }) => any;
  comfortPrice?: (props: { mdcUnwrap: string }) => any;
  comfortFeatures?: (props: {}) => any;
  premiumTitle?: (props: { mdcUnwrap: string }) => any;
  premiumPrice?: (props: { mdcUnwrap: string }) => any;
  premiumFeatures?: (props: {}) => any;
  infoText?: (props: {}) => any;
}>();
</script>

<template>
  <section class="full-width data-scroll-section relative w-full" data-scroll-section>
    <!-- Background with overlay -->
    <div class="absolute w-full h-full inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 bg-white/80 z-10"></div>
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
      <TitleSection>
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
          class="breakout1 grid md:grid-cols-3 gap-8"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <!-- Basic Plan -->
          <div class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="bg-primary p-6 text-center">
              <h3 class="text-2xl font-semibold text-white">
                <slot name="basicTitle" mdc-unwrap="p">BASIC</slot>
              </h3>
            </div>
            <div class="p-8 flex-1 flex flex-col">
              <div class="text-center mb-8">
                <div class="text-4xl font-bold text-primary">
                  <slot name="basicPrice" mdc-unwrap="p">1190 zł/m²</slot>
                </div>
              </div>
              <div class="flex-1 prose prose-lg max-w-none">
                <slot name="basicFeatures" />
              </div>
            </div>
          </div>

          <!-- Comfort Plan -->
          <div class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="bg-primary p-6 text-center">
              <h3 class="text-2xl font-semibold text-white">
                <slot name="comfortTitle" mdc-unwrap="p">COMFORT</slot>
              </h3>
            </div>
            <div class="p-8 flex-1 flex flex-col">
              <div class="text-center mb-8">
                <div class="text-4xl font-bold text-primary">
                  <slot name="comfortPrice" mdc-unwrap="p">1590 zł/m²</slot>
                </div>
              </div>
              <div class="flex-1 prose prose-lg max-w-none">
                <slot name="comfortFeatures" />
              </div>
            </div>
          </div>

          <!-- Premium Plan -->
          <div class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="bg-primary p-6 text-center">
              <h3 class="text-2xl font-semibold text-white">
                <slot name="premiumTitle" mdc-unwrap="p">PREMIUM</slot>
              </h3>
            </div>
            <div class="p-8 flex-1 flex flex-col">
              <div class="text-center mb-8">
                <div class="text-4xl font-bold text-primary">
                  <slot name="premiumPrice" mdc-unwrap="p">2490 zł/m²</slot>
                </div>
              </div>
              <div class="flex-1 prose prose-lg max-w-none">
                <slot name="premiumFeatures" />
              </div>
            </div>
          </div>
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
