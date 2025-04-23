<script setup lang="ts">
defineProps<{
  to?: string;
  aspectRatio?: number; // width/height ratio (e.g., 16/9 = 1.78, 4/3 = 1.33, 1/1 = 1)
  hoverText?: string; // Optional text to show on hover
}>();
</script>

<template>
  <!-- Use v-if/v-else for consistent component rendering -->
  <NuxtLink v-if="to" :to="to" class="block relative overflow-hidden group">
    <div class="relative overflow-hidden">
      <div
        class="relative overflow-hidden"
        :style="{ paddingBottom: aspectRatio ? `${(1 / aspectRatio) * 100}%` : '75%' }"
      >
        <div
          class="absolute inset-0 bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        >
          <div
            v-if="hoverText"
            class="absolute text-center inset-0 flex items-center justify-center text-white uppercase text-2xl font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            v-html="hoverText"
          ></div>
        </div>
        <div class="absolute inset-0">
          <slot name="image" />
        </div>
      </div>
    </div>

    <div class="pt-6">
      <h3 class="text-xl font-semibold text-primary mb-2">
        <slot name="title" mdc-unwrap="p" />
      </h3>
      <div class="text-neutral-700">
        <slot name="description" />
      </div>

      <!-- Mobile-only button with client-side-only rendering -->
      <ClientOnly>
        <BaseButton :to="to" variant="primary" class="md:hidden mt-4" full-width>
          Zobacz więcej
        </BaseButton>
      </ClientOnly>
    </div>
  </NuxtLink>

  <div v-else class="block relative overflow-hidden">
    <div class="relative overflow-hidden">
      <div
        class="relative overflow-hidden"
        :style="{ paddingBottom: aspectRatio ? `${(1 / aspectRatio) * 100}%` : '75%' }"
      >
        <div class="absolute inset-0">
          <slot name="image" />
        </div>
      </div>
    </div>

    <div class="pt-6">
      <h3 class="text-xl font-semibold text-primary mb-2">
        <slot name="title" mdc-unwrap="p" />
      </h3>
      <div class="text-neutral-700">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>
