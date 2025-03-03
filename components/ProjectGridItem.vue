<template>
  <NuxtLink
    :to="to"
    class="group block relative overflow-hidden"
    data-scroll-item
    data-scroll-animation="fadeUp"
    data-scroll-duration="0.8"
    data-scroll-stagger="0.2"
  >
    <!-- Image with Overlay -->
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
      ></div>
      <slot name="image" />
    </div>

    <!-- Content -->
    <div class="pt-6">
      <h3 class="text-xl font-semibold text-primary mb-2">
        <slot name="title" mdc-unwrap="p" />
      </h3>
      <div class="text-neutral-700">
        <slot name="description" mdc-unwrap="p" />
      </div>

      <!-- Mobile-only button -->
      <button
        class="md:hidden mt-4 w-full rounded-md bg-primary px-6 py-3 text-sm font-medium text-white"
      >
        Zobacz więcej
      </button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>
