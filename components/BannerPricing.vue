<script setup lang="ts">
// No props needed anymore since we're using slots exclusively
</script>

<template>
  <div class="full-width" data-scroll-section>
    <!-- Image Section -->
    <div class="relative min-h-[50vh] overflow-hidden">
      <div class="absolute w-full h-full inset-0">
        <div class="absolute inset-0 bg-black/30"></div>
        <slot v-if="$slots.image" name="image" />
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-grid py-16">
      <div class="breakout1">
        <!-- Title & Description -->
        <div class="mb-16">
          <h2
            v-if="$slots.title"
            class="h2-style text-center font-semibold text-primary mb-6"
            data-scroll-item
            data-scroll-animation="fadeUp"
          >
            <slot name="title" mdc-unwrap="p" />
          </h2>
          <div
            v-if="$slots.description"
            class="text-xl md:text-2xl"
            data-scroll-item
            data-scroll-animation="fadeUp"
          >
            <slot name="description" mdc-unwrap="p" />
          </div>
        </div>
      </div>

      <!-- Pricing Grid -->
      <div class="full-width">
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-0"
          data-scroll-item
          data-scroll-animation="fadeUp"
        >
          <slot name="options" mdc-unwrap="p" />
        </div>
      </div>

      <div class="breakout1">
        <!-- Info Text -->
        <p
          v-if="$slots.infoText"
          class="text-sm text-neutral-600 mt-8"
          data-scroll-item
          data-scroll-animation="fadeUp"
        >
          <slot name="infoText" mdc-unwrap="p" />
        </p>
      </div>
    </div>
  </div>
</template>
