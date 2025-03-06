<script setup lang="ts">
// Define props for the component
defineProps<{
  ctaLink?: string;
}>();

defineSlots<{
  heroImage?: (props: {}) => any;
  title?: (props: { mdcUnwrap: string }) => any;
  description?: (props: { mdcUnwrap: string }) => any;
  submitText?: (props: {}) => any;
  infoText?: (props: {}) => any;
}>();
// Form event handlers
const handleFormLoad = () => {
  // console.log('HubSpot form loaded successfully');
};

const handleFormError = (error: any) => {
  console.error('HubSpot form error:', error);
};
</script>

<template>
  <section
    class="full-width data-scroll-section relative min-h-[100vh] w-full overflow-hidden"
    data-scroll-section
  >
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
      <div class="content-grid w-full relative z-10 grid min-h-screen content-end gap-y-8">
        <div class="breakout1 grid md:grid-cols-2 items-center gap-8 py-16">
          <!-- Left Column: Form Section -->
          <ClientOnly>
            <ContactForm data-scroll-item data-scroll-animation="fadeUp" data-scroll-duration="1">
              <template #title>
                <slot name="title" mdc-unwrap="p" />
              </template>
              <template #description>
                <slot name="description" mdc-unwrap="p" />
              </template>
              <template #submitText>
                <slot name="submitText" mdc-unwrap="p" />
              </template>
            </ContactForm>
          </ClientOnly>
          <!-- HubSpot Form -->
          <ClientOnly>
            <HubspotForm
              formId="4620c0d5-ee42-40e1-9558-b5c4ba031abc"
              region="eu1"
              @load="handleFormLoad"
              @error="handleFormError"
            />
            <template #fallback>
              <div class="animate-pulse">
                <div class="h-12 bg-gray-200 rounded mb-4"></div>
                <div class="h-12 bg-gray-200 rounded mb-4"></div>
                <div class="h-12 bg-gray-200 rounded"></div>
              </div>
            </template>
          </ClientOnly>

          <!-- Right Column: Empty for background visibility -->
          <div></div>
        </div>

        <!-- Info Text Section -->
        <div
          v-if="$slots.infoText"
          class="breakout1 mb-16"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
          data-scroll-independent="true"
          data-scroll-start="top bottom"
        >
          <div class="py-8 md:py-12">
            <div class="text-sm leading-relaxed text-white">
              <slot name="infoText" mdc-unwrap="p" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
