<script setup lang="ts">
import HeroPath from '~/components/HeroPath.vue';
</script>

<template>
  <section class="min-h-screen bg-neutral-100" data-scroll-section>
    <div class="content-grid py-24">
      <div class="breakout1 grid md:grid-cols-2 gap-12">
        <!-- Text Column -->
        <div class="grid content-center gap-8">
          <div class="grid gap-4">
            <h2
              v-if="$slots.name"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
              data-scroll-order="1"
              class="h2-style font-semibold"
            >
              <slot name="name" mdc-unwrap="p" />
            </h2>
            <p
              v-if="$slots.role"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
              data-scroll-order="2"
              class="text-primary font-medium"
            >
              <slot name="role" mdc-unwrap="p" />
            </p>
            <p
              v-if="$slots.description"
              data-scroll-item
              data-scroll-animation="fadeUp"
              data-scroll-duration="1"
              data-scroll-order="3"
              class="body-large"
            >
              <slot name="description" mdc-unwrap="p" />
            </p>
          </div>
        </div>

        <!-- Image Column -->
        <div
          v-if="$slots.image"
          class="relative"
          data-scroll-item
          data-scroll-animation="fadeIn"
          data-scroll-duration="1.5"
        >
          <div class="relative aspect-[3/4] overflow-hidden">
            <slot name="image" />
            <HeroPath class="absolute bottom-0 left-0 h-full opacity-50" />
          </div>
        </div>
      </div>

      <!-- Achievements Grid -->
      <div v-if="$slots.achievements" class="breakout1 mt-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <slot name="achievements" />
        </div>
      </div>
    </div>
  </section>
</template>
