<script setup lang="ts">
defineProps<{
  to: string;
  number: string;
  title: string;
  location: string;
  year: string;
  image: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="group block relative aspect-square overflow-hidden"
    data-scroll-item
    data-scroll-animation="fadeUp"
    data-scroll-duration="0.8"
    data-scroll-stagger="0.2"
  >
    <!-- Background Image -->
    <nuxt-img
      :src="image"
      :alt="title"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      format="webp"
    />

    <!-- Dark Overlay -->
    <div
      class="absolute inset-0 bg-neutral-900/30 transition-opacity duration-300 group-hover:bg-primary/40"
    ></div>

    <!-- Number -->
    <div
      class="absolute top-6 left-6 text-4xl font-bold transition-colors duration-300 text-primary group-hover:text-white"
    >
      {{ number }}
    </div>

    <!-- Content -->
    <div class="absolute inset-x-0 bottom-0 p-6">
      <div
        class="transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"
      >
        <h3 class="text-xl font-semibold text-white mb-2">{{ title }}</h3>
        <div class="text-sm text-white/80">{{ location }} | {{ year }}</div>
      </div>
    </div>
  </NuxtLink>
</template>
