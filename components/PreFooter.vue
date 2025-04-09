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

// Form event handlers
const handleFormLoad = () => {
  // console.log('HubSpot form loaded successfully');
};

const handleFormError = (error: any) => {
  console.error('HubSpot form error:', error);
};
</script>

<template>
  <section class="full-width relative w-full py-24" data-scroll-section>
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
      <div class="breakout1">
        <!-- Contact and Form Section -->
        <div class="grid md:grid-cols-2 gap-12 mb-16">
          <!-- Contact Information -->
          <div class="space-y-6 max-w-xs" v-scroll-anim:fadeUp="{ delay: 0.5, start: 'top 75%' }">
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

          <!-- HubSpot Form -->
          <ClientOnly>
            <div v-scroll-anim:scale="{ delay: 0.7, start: 'top 75%' }">
              <HubspotForm
                formId="be873485-56f5-42c9-8301-efaa818bdd36"
                region="eu1"
                @load="handleFormLoad"
                @error="handleFormError"
              />
            </div>
            <template #fallback>
              <div class="animate-pulse" v-scroll-anim:fadeIn>
                <div class="h-12 bg-gray-200 rounded mb-4"></div>
                <div class="h-12 bg-gray-200 rounded mb-4"></div>
                <div class="h-12 bg-gray-200 rounded"></div>
              </div>
            </template>
          </ClientOnly>
        </div>
        <!-- Main Title -->
        <h2
          v-if="$slots.title"
          class="h2-style text-center font-semibold text-primary mb-16"
          v-scroll-anim:splitText="{ type: 'chars', stagger: 0.02, start: 'top 85%' }"
        >
          <slot name="title" mdc-unwrap="p" />
        </h2>
        <!-- Company Information Grid -->
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Left Company -->
          <div
            class="grid md:grid-cols-2 gap-8 items-start"
            v-scroll-anim:fadeLeft="{ delay: 0.1, start: 'top 80%' }"
          >
            <div class="flex justify-center items-start">
              <slot name="leftCompanyLogo">
                <Logo class="w-full max-w-[200px]" />
              </slot>
            </div>
            <div class="space-y-4">
              <NuxtLink
                target="_blank"
                to="https://wlasciwykurs.com/"
                class="text-xl font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                <h3 v-if="$slots.leftCompanyTitle">
                  <slot name="leftCompanyTitle" mdc-unwrap="p" />
                </h3>
              </NuxtLink>
              <h4 v-if="$slots.leftCompanySubtitle" class="text-lg text-neutral-600">
                <slot name="leftCompanySubtitle" mdc-unwrap="p" />
              </h4>
              <div v-if="$slots.leftCompanyText" class="text-neutral-700">
                <slot name="leftCompanyText" mdc-unwrap="p" />
              </div>
            </div>
          </div>

          <!-- Right Company -->
          <div
            class="grid md:grid-cols-2 gap-8 items-start"
            v-scroll-anim:fadeRight="{ delay: 0.3, start: 'top 80%' }"
          >
            <div class="flex justify-center items-start">
              <slot name="rightCompanyLogo">
                <Logo class="w-full max-w-[200px]" />
              </slot>
            </div>
            <div class="space-y-4">
              <NuxtLink
                target="_blank"
                to="https://molkiinvest.pl/"
                class="text-xl font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                <h3 v-if="$slots.rightCompanyTitle">
                  <slot name="rightCompanyTitle" mdc-unwrap="p" />
                </h3>
              </NuxtLink>
              <h4 v-if="$slots.rightCompanySubtitle" class="text-lg text-neutral-600">
                <slot name="rightCompanySubtitle" mdc-unwrap="p" />
              </h4>
              <div v-if="$slots.rightCompanyText" class="text-neutral-700">
                <slot name="rightCompanyText" mdc-unwrap="p" />
              </div>
            </div>
          </div>
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
