<script setup lang="ts">
import FrameCorner from '~/components/HeroSlider/FrameCorner.vue';

// Remove props since we'll use slots exclusively
</script>

<template>
  <section class="min-h-screen relative flex flex-col" data-scroll-section>
    <div class="relative flex-1 flex flex-col">
      <!-- Title Section -->
      <div class="content-grid relative z-10 py-8 md:py-12">
        <div class="breakout1">
          <h2
            class="h2-style font-semibold text-primary"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
            data-scroll-position="+=0.5"
          >
            <slot name="title" />
          </h2>
        </div>
      </div>

      <!-- Hero Image Slot -->
      <div class="relative flex-1 min-h-[70vh] overflow-hidden">
        <slot name="heroImage">
          <div class="absolute w-full h-full inset-0 z-0">
            <div class="absolute inset-0 bg-black/30"></div>
            <ParallaxImg
              src="/heroHome.jpg"
              alt="Team section background"
              class="h-full w-full object-cover"
              format="webp"
            />
          </div>
        </slot>
      </div>

      <!-- Description Slot -->
      <div class="content-grid relative z-10 py-12 md:py-16 bg-neutral-100">
        <div class="breakout1">
          <div class="relative">
            <FrameCorner position="top-left" />
            <div class="space-y-6 px-8 py-12">
              <slot name="description">
                <!-- Default description items -->
                <template v-for="(_, index) in 2" :key="index">
                  <p
                    data-scroll-stagger-group
                    data-scroll-animation="fadeUp"
                    data-scroll-duration="0.8"
                    data-scroll-stagger="0.2"
                    class="text-xl md:text-2xl leading-relaxed text-neutral-800 opacity-0"
                  >
                    <slot :name="`description-${index}`" />
                  </p>
                </template>
              </slot>
            </div>
            <FrameCorner position="bottom-right" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
