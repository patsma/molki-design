<script setup lang="ts">
import FrameCorner from '~/components/HeroSlider/FrameCorner.vue';
import HeroPath from '~/components/HeroPath.vue';

// No props needed - pure slot-based component
</script>

<template>
  <section class="min-h-screen bg-neutral-100" data-scroll-section>
    <div class="content-grid py-24">
      <div class="breakout1 grid md:grid-cols-2 gap-12">
        <!-- Text Column -->
        <div class="grid content-center gap-8">
          <div class="grid gap-4">
            <slot name="header">
              <h2
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="1"
                data-scroll-order="1"
                data-scroll-delay="0.5"
                data-scroll-position="+=1"
                class="h2-style font-semibold"
              >
                <slot name="name" />
              </h2>
              <p
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="1"
                data-scroll-order="2"
                class="text-primary font-medium"
              >
                <slot name="role" />
              </p>
              <p
                data-scroll-item
                data-scroll-animation="fadeUp"
                data-scroll-duration="1"
                data-scroll-order="3"
                class="body-large"
              >
                <slot name="description" />
              </p>
            </slot>
          </div>
        </div>

        <!-- Image Slot -->
        <div
          class="relative"
          data-scroll-item
          data-scroll-animation="fadeIn"
          data-scroll-order="1"
          data-scroll-duration="1.5"
          data-scroll-position="+=1"
        >
          <slot name="image">
            <div class="relative aspect-[3/4] overflow-hidden">
              <ParallaxImg
                src="/heroHome.jpg"
                alt="Team member photo"
                class="h-full w-full object-cover"
                format="webp"
              />
              <HeroPath class="absolute bottom-0 left-0 h-full opacity-50" />
            </div>
          </slot>
        </div>
      </div>

      <!-- Achievements Slot -->
      <div class="breakout1 mt-16">
        <slot name="achievements">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <template v-for="(_, index) in 4" :key="index">
              <div
                data-scroll-stagger-group
                data-scroll-animation="fadeUp"
                data-scroll-duration="0.8"
                data-scroll-stagger="0.2"
                class="relative p-8 text-center"
              >
                <FrameCorner position="top-left" class="scale-75" />
                <h3 class="h3-style font-bold text-primary mb-2">
                  <slot :name="`achievement-${index}-title`" />
                </h3>
                <div class="w-12 h-0.5 bg-primary mx-auto mb-2"></div>
                <p class="body-small">
                  <slot :name="`achievement-${index}-subtitle`" />
                </p>
                <FrameCorner position="bottom-right" class="scale-75" />
              </div>
            </template>
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>
