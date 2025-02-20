<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import { onMounted, ref, useSlots, type Slots } from 'vue';

interface SwiperElement extends HTMLElement {
  swiper?: {
    slidePrev: () => void;
    slideNext: () => void;
  };
  initialize: () => void;
}

register();

interface Props {
  ctaText?: string;
  ctaLink?: string;
}

const props = withDefaults(defineProps<Props>(), {
  ctaText: 'UMÓW KONSULTACJĘ',
  ctaLink: '/buttons',
});

const slots = useSlots() as Slots;
const swiperRef = ref<SwiperElement | null>(null);

// Custom navigation methods
const handlePrevSlide = () => {
  if (swiperRef.value?.swiper) {
    swiperRef.value.swiper.slidePrev();
  }
};

const handleNextSlide = () => {
  if (swiperRef.value?.swiper) {
    swiperRef.value.swiper.slideNext();
  }
};

onMounted(() => {
  // Initialize Swiper
  nextTick(() => {
    if (swiperRef.value) {
      const swiperParams = {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
      };

      Object.assign(swiperRef.value, swiperParams);
      swiperRef.value.initialize();
    }
  });
});
</script>

<template>
  <div class="relative h-screen w-full">
    <!-- Slider Container -->
    <ClientOnly>
      <swiper-container ref="swiperRef" class="w-full h-full">
        <template v-if="slots['slides-0']">
          <swiper-slide v-for="index in 2" :key="`slide-${index - 1}`" class="w-full h-full">
            <slot :name="`slides-${index - 1}`" />
          </swiper-slide>
        </template>
      </swiper-container>
    </ClientOnly>

    <!-- Navigation Arrows -->
    <button
      @click="handlePrevSlide"
      class="absolute left-8 top-1/2 -translate-y-1/2 z-10 text-primary hover:text-primary-dark transition-colors"
      aria-label="Previous slide"
    >
      <svg class="w-12 h-12 transform rotate-180" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" />
      </svg>
    </button>

    <button
      @click="handleNextSlide"
      class="absolute right-8 top-1/2 -translate-y-1/2 z-10 text-primary hover:text-primary-dark transition-colors"
      aria-label="Next slide"
    >
      <svg class="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" />
      </svg>
    </button>

    <!-- Persistent CTA Button -->
    <div
      class="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-screen-xl mx-auto px-4"
    >
      <div class="relative w-full grid place-items-center">
        <!-- Decorator Line -->
        <div class="absolute w-screen h-[0.15rem] bg-primary"></div>

        <!-- Button -->
        <NuxtLink
          :to="ctaLink"
          class="relative rounded-md cursor-pointer bg-primary px-8 py-5 tracking-widest text-base font-spartan font-bold text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <slot name="cta" mdc-unwrap="p">{{ ctaText }}</slot>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
swiper-container::part(bullet) {
  background-color: white;
  opacity: 0.5;
}

swiper-container::part(bullet-active) {
  background-color: theme('colors.primary.DEFAULT');
  opacity: 1;
}
</style>
