<script setup lang="ts">
import FrameCorner from './FrameCorner.vue';

interface HeroSliderData {
  title: string;
  description: string[];
  image: string;
}

defineProps<{
  data: { heroSlider: HeroSliderData };
}>();
</script>

<template>
  <div class="hero-slider">
    <section class="min-h-screen relative flex flex-col">
      <div class="relative flex-1 flex flex-col">
        <!-- Title Section -->
        <div class="content-grid relative z-10 py-8 md:py-12">
          <div class="breakout1">
            <h2 class="h2-style font-semibold text-primary">
              {{ data.heroSlider.title }}
            </h2>
          </div>
        </div>

        <!-- Image Section -->
        <div class="relative flex-1 min-h-[70vh]">
          <div class="absolute w-full h-full inset-0 z-0">
            <div class="absolute inset-0 bg-black/30"></div>
            <NuxtImg
              :src="data.heroSlider.image"
              alt="Molki Design Team"
              class="h-full w-full object-cover"
              loading="eager"
              placeholder
              format="webp"
              quality="90"
            />
          </div>
        </div>

        <!-- Description Section -->
        <div class="content-grid relative z-10 py-12 md:py-16 bg-neutral-100">
          <div class="breakout1">
            <div class="relative">
              <FrameCorner position="top-left" />
              <div class="space-y-6 px-8 py-12">
                <p
                  v-for="(paragraph, index) in data.heroSlider.description"
                  :key="index"
                  class="text-xl md:text-2xl leading-relaxed text-neutral-800"
                >
                  {{ paragraph }}
                </p>
              </div>
              <FrameCorner position="bottom-right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
