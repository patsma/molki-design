<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import { onMounted, ref } from 'vue';

interface SwiperContainer extends HTMLElement {
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
  images: Array<{ src: string; alt?: string }>;
}

const props = withDefaults(defineProps<Props>(), {
  ctaText: 'UMÓW KONSULTACJĘ',
  ctaLink:
    'https://meetings-eu1.hubspot.com/wioletta-retko?uuid=91bf4e62-5e59-4f9e-9c23-633477ef3271',
  images: () => [],
});

const swiperRef = ref<SwiperContainer | null>(null);

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
  if (swiperRef.value) {
    swiperRef.value.initialize();
  }
});
</script>

<template>
  <div v-scroll-anim:fadeUp="{ delay: 0.4 }" class="relative h-screen w-full">
    <!-- Slider Container -->
    <ClientOnly>
      <swiper-container
        ref="swiperRef"
        class="w-full h-full"
        :loop="true"
        :pagination="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
      >
        <swiper-slide v-for="(image, index) in images" :key="index" class="w-full h-full">
          <parallax-img class="w-full h-full object-cover">
            <nuxt-img
              :src="image.src"
              :alt="image.alt || `Slide ${index + 1}`"
              format="webp"
              loading="eager"
              class="w-full h-full object-cover"
            />
          </parallax-img>
        </swiper-slide>
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
          {{ ctaText }}
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
