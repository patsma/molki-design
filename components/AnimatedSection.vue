<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  animationType: {
    type: String,
    default: 'fadeUp',
  },
  delay: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Title with animation -->
      <h2 v-if="title" class="text-3xl md:text-4xl font-bold mb-6" v-scroll-anim="animationType">
        {{ title }}
      </h2>

      <!-- Subtitle with delayed animation -->
      <div
        v-if="subtitle"
        class="text-lg md:text-xl mb-12 text-neutral-700"
        v-scroll-anim="{ delay: 0.2 }"
      >
        {{ subtitle }}
      </div>

      <!-- Content with staggered animations -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <slot />
      </div>
    </div>
  </section>
</template>
