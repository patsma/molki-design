<script setup lang="ts">
// Define slots
defineSlots<{
  title?: (props: { mdcUnwrap: string }) => any;
  backgroundImage?: (props: {}) => any;
  // Left column slots
  leftCompanyLogo?: (props: {}) => any;
  leftCompanyTitle?: (props: { mdcUnwrap: string }) => any;
  leftCompanySubtitle?: (props: { mdcUnwrap: string }) => any;
  leftCompanyText?: (props: { mdcUnwrap: string }) => any;
  // Right column slots
  rightCompanyLogo?: (props: {}) => any;
  rightCompanyTitle?: (props: { mdcUnwrap: string }) => any;
  rightCompanySubtitle?: (props: { mdcUnwrap: string }) => any;
  rightCompanyText?: (props: { mdcUnwrap: string }) => any;
  // Contact section slots
  contactTitle?: (props: { mdcUnwrap: string }) => any;
  contactInfo?: (props: { mdcUnwrap: string }) => any;
}>();
</script>

<template>
  <section class="full-width data-scroll-section relative w-full py-24" data-scroll-section>
    <!-- Background with overlay -->
    <div class="absolute w-full h-full inset-0 z-0 overflow-hidden">
      <div class="absolute inset-0 bg-white/90 z-10"></div>
      <slot name="backgroundImage">
        <!-- Default background image -->
        <ParallaxImg
          src="/preFooterBg.jpg"
          alt="Pre-footer background"
          class="h-full w-full object-cover"
          format="webp"
        />
      </slot>
    </div>

    <div class="content-grid relative z-10">
      <!-- Main Title -->
      <h2
        v-if="$slots.title"
        class="h2-style text-center font-semibold text-primary mb-16"
        data-scroll-item
        data-scroll-animation="fadeUp"
        data-scroll-duration="1"
      >
        <slot name="title" mdc-unwrap="p" />
      </h2>

      <div class="breakout1">
        <!-- Company Information Grid -->
        <div
          class="grid md:grid-cols-2 gap-12 mb-16"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <!-- Left Company -->
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="flex justify-center items-center">
              <slot name="leftCompanyLogo">
                <Logo class="w-full max-w-[200px]" />
              </slot>
            </div>
            <div class="space-y-4">
              <h3 v-if="$slots.leftCompanyTitle" class="text-xl font-semibold text-primary">
                <slot name="leftCompanyTitle" mdc-unwrap="p" />
              </h3>
              <h4 v-if="$slots.leftCompanySubtitle" class="text-lg text-neutral-600">
                <slot name="leftCompanySubtitle" mdc-unwrap="p" />
              </h4>
              <div v-if="$slots.leftCompanyText" class="text-neutral-700">
                <slot name="leftCompanyText" mdc-unwrap="p" />
              </div>
            </div>
          </div>

          <!-- Right Company -->
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="flex justify-center items-center">
              <slot name="rightCompanyLogo">
                <Logo class="w-full max-w-[200px]" />
              </slot>
            </div>
            <div class="space-y-4">
              <h3 v-if="$slots.rightCompanyTitle" class="text-xl font-semibold text-primary">
                <slot name="rightCompanyTitle" mdc-unwrap="p" />
              </h3>
              <h4 v-if="$slots.rightCompanySubtitle" class="text-lg text-neutral-600">
                <slot name="rightCompanySubtitle" mdc-unwrap="p" />
              </h4>
              <div v-if="$slots.rightCompanyText" class="text-neutral-700">
                <slot name="rightCompanyText" mdc-unwrap="p" />
              </div>
            </div>
          </div>
        </div>

        <!-- Contact and Form Section -->
        <div
          class="grid md:grid-cols-2 gap-12"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <!-- Contact Information -->
          <div class="space-y-6 max-w-xs">
            <h3
              v-if="$slots.contactTitle"
              class="text-xl text-primary font-semibold pb-4 border-gradient"
            >
              <slot name="contactTitle" mdc-unwrap="p" />
            </h3>
            <div v-if="$slots.contactInfo" class="prose prose-lg max-w-none">
              <slot name="contactInfo" mdc-unwrap="p" />
            </div>
          </div>

          <!-- Contact Form -->
          <ClientOnly>
            <ContactForm
              class="p-8"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
            >
              <template #title>Skontaktuj się z nami</template>
              <template #description>Wypełnij formularz, a my skontaktujemy się z Tobą.</template>
            </ContactForm>
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.border-gradient {
  border-bottom: 0.2rem solid;
  border-image: linear-gradient(to right, #b76246, #d0835f, #a04225) 1;
}
</style>
