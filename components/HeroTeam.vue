<script setup lang="ts">
import FrameCorner from '~/components/FrameCorner.vue';
</script>

<template>
  <div class="hero-team" data-scroll-section>
    <!-- Team Intro Section -->
    <section class="min-h-screen relative flex flex-col">
      <div class="relative flex-1 flex flex-col">
        <!-- Title Section -->
        <div data-scroll-section class="content-grid relative z-10 py-8 md:py-12">
          <div class="breakout1">
            <h2
              v-if="$slots.title"
              class="h2-style font-semibold text-primary"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
              data-scroll-position="+=0.5"
            >
              <slot name="title" mdc-unwrap="p" />
            </h2>
          </div>
        </div>

        <!-- Image Section -->
        <div class="grid relative overflow-hidden">
          <div class="absolute bottom-0 -left-[10rem] overflow-hidden z-10 pointer-events-none">
            <HeroPath2 class="w-80" />
          </div>
          <slot v-if="$slots.image" name="image" />
        </div>

        <!-- Description Section -->
        <div class="content-grid relative z-10 py-12 md:py-16 bg-neutral-100">
          <div class="breakout1">
            <div class="relative">
              <FrameCorner
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="0.8"
                data-scroll-independent="true"
                data-scroll-start="top center"
                position="top-left"
              />
              <div
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="1"
                data-scroll-independent="true"
                data-scroll-start="top bottom"
                v-if="$slots.description"
                class="space-y-6 px-8 py-12 text-xl md:text-2xl leading-relaxed text-neutral-800"
              >
                <slot name="description" />
              </div>
              <FrameCorner
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="0.8"
                data-scroll-independent="true"
                data-scroll-start="top center"
                position="bottom-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
