<script setup lang="ts">
interface PricingOption {
  title: string;
  price: string;
}

defineProps<{
  options?: PricingOption[];
  infoText?: string;
}>();

// Default pricing options if none provided
const defaultOptions = [
  {
    title: 'Porada Projektowa',
    price: '600 zł',
  },
  {
    title: 'Porada Projektowa z dokumentacją',
    price: '1 200 zł',
  },
];
</script>

<template>
  <div class="banner-pricing" data-scroll-section>
    <!-- Image Section -->
    <div class="relative min-h-[50vh] overflow-hidden">
      <div class="absolute w-full h-full inset-0">
        <div class="absolute inset-0 bg-black/30"></div>
        <slot v-if="$slots.image" name="image" />
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-grid py-16 bg-neutral-100">
      <div class="breakout1">
        <!-- Title & Description -->
        <div class="text-center mb-16">
          <h2
            v-if="$slots.title"
            class="h2-style font-semibold text-primary mb-6"
            data-scroll-item
            data-scroll-animation="fadeUp"
          >
            <slot name="title" />
          </h2>
          <div
            v-if="$slots.description"
            class="text-xl md:text-2xl max-w-3xl mx-auto"
            data-scroll-item
            data-scroll-animation="fadeUp"
          >
            <slot name="description" />
          </div>
        </div>

        <!-- Pricing Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          data-scroll-item
          data-scroll-animation="fadeUp"
        >
          <template v-if="$slots.options">
            <slot name="options" />
          </template>
          <template v-else>
            <div
              v-for="option in options || defaultOptions"
              :key="option.title"
              class="text-center p-8 bg-white rounded-lg shadow-md"
            >
              <h3 class="text-xl font-semibold text-primary mb-4">{{ option.title }}</h3>
              <p class="text-2xl font-bold text-neutral-800">{{ option.price }}</p>
            </div>
          </template>
        </div>

        <!-- Info Text -->
        <p
          v-if="$slots.infoText || infoText"
          class="text-sm text-neutral-600 text-center"
          data-scroll-item
          data-scroll-animation="fadeUp"
        >
          <slot name="infoText">{{ infoText }}</slot>
        </p>
      </div>
    </div>
  </div>
</template>
