<script setup lang="ts">
import FrameCorner from '~/components/FrameCorner.vue';
</script>

<template>
  <div class="hero-team" data-scroll-section>
    <!-- Team Intro Section -->
    <section class="min-h-screen relative flex flex-col">
      <div class="relative flex-1 flex flex-col">
        <!-- Image Section -->
        <div
          class="grid relative min-h-[35vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[90vh] overflow-hidden"
          v-scroll-anim:fadeIn="{ duration: 1.2 }"
        >
          <div class="absolute bottom-0 -left-[10rem] overflow-hidden z-10 pointer-events-none">
            <HeroPath2 class="w-80" />
          </div>
          <slot v-if="$slots.image" name="image" />
        </div>

        <!-- Title Section -->
        <div data-scroll-section class="content-grid text-center relative z-10 pt-8 md:pt-12">
          <div class="breakout1">
            <ClientOnly>
              <h2
                v-if="$slots.title"
                class="h2-style font-semibold text-primary"
                v-scroll-anim:splitText="{ type: 'words', stagger: 0.05 }"
              >
                <slot name="title" mdc-unwrap="p" />
              </h2>
            </ClientOnly>
          </div>
        </div>
        <!-- Description Section -->
        <div class="content-grid relative z-10 py-12 md:py-16 bg-neutral-100">
          <div class="breakout1">
            <div class="relative">
              <FrameCorner v-scroll-anim:fadeUp="{ delay: 0.2 }" position="top-left" />
              <div
                v-if="$slots.description"
                class="space-y-6 px-8 py-12 text-xl md:text-2xl leading-relaxed text-neutral-800"
                v-scroll-anim:fadeUp="{ delay: 0.4 }"
              >
                <slot name="description" />
              </div>
              <FrameCorner v-scroll-anim:fadeUp="{ delay: 0.2 }" position="bottom-right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
