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
      <!-- Aspect ratio container -->
      <div
        class="relative overflow-hidden"
        :style="{ paddingBottom: aspectRatio ? `${(1 / aspectRatio) * 100}%` : '75%' }"
      >
        <div
          class="absolute inset-0 bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        ></div>
        <!-- Image slot with absolute positioning -->
        <div class="absolute inset-0">
          <slot name="image" />
        </div>
      </div>
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
  aspectRatio?: number; // width/height ratio (e.g., 16/9 = 1.78, 4/3 = 1.33, 1/1 = 1)
}>();
</script>
