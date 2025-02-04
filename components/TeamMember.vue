<script setup lang="ts">
import HeroPath from '~/components/HeroPath.vue';
import FrameCorner from '~/components/FrameCorner.vue';
</script>

<template>
  <section class="min-h-screen bg-neutral-100">
    <div class="content-grid py-24">
      <div class="breakout1 grid md:grid-cols-2 gap-12" data-scroll-section>
        <!-- Text Column -->
        <div class="flex flex-col h-full gap-10">
          <!-- Section Title -->
          <h3
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
            data-scroll-position="+=1"
            data-scroll-delay="0.5"
            data-scroll-order="1"
            class="h3-style font-bold uppercase tracking-widest text-secondary"
          >
            <slot name="section-title" mdc-unwrap="p">POZNAJMY SIĘ!</slot>
          </h3>

          <div class="grid gap-8">
            <!-- Name and Role with Decorator -->
            <div
              class="relative gap-1 grid pl-6 border-l-2 border-primary"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
              data-scroll-order="2"
            >
              <h2 v-if="$slots.name" class="h2-style font-semibold text-primary">
                <slot name="name" mdc-unwrap="p" />
              </h2>
              <p v-if="$slots.role" class="font-medium">
                <slot name="role" mdc-unwrap="p" />
              </p>
            </div>

            <!-- Description -->
            <div
              v-if="$slots.description"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
              data-scroll-order="3"
              class="body-large text-neutral-700 leading-relaxed space-y-6"
            >
              <slot name="description" />
            </div>
          </div>
        </div>

        <!-- Image Column -->
        <div
          v-if="$slots.image"
          class="relative"
          data-scroll-item
          data-scroll-animation="fadeIn"
          data-scroll-order="4"
          data-scroll-duration="1.5"
        >
          <div class="relative aspect-[3/4] overflow-hidden">
            <slot name="image" />
            <HeroPath class="absolute bottom-0 left-0 h-full opacity-50" />
          </div>
        </div>
      </div>

      <!-- Achievements Grid -->
      <div
        v-if="$slots.achievements"
        class="breakout1 mt-16 relative p-4 md:p-8"
        data-scroll-section
      >
        <FrameCorner
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="0.8"
          data-scroll-independent="true"
          data-scroll-start="top center"
          position="top-left"
          class="-top-4"
        />
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
          <slot name="achievements" />
        </div>
        <FrameCorner
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="0.8"
          data-scroll-independent="true"
          data-scroll-start="top center"
          position="bottom-right"
          class="-bottom-4"
        />
      </div>
    </div>
  </section>
</template>
