<script setup lang="ts">
const siteConfig = useSiteConfig();

defineProps<{
  title?: string;
  description?: string;
  image?: string;
}>();

// Helper to get absolute image URL
const getAbsoluteImage = (imgPath?: string) => {
  if (!imgPath) return `${siteConfig.url}/og-image.jpg`;
  return imgPath.startsWith('http') ? imgPath : `${siteConfig.url}${imgPath}`;
};
</script>

<template>
  <div class="flex h-full w-full items-center justify-center bg-white p-16">
    <div class="flex max-w-5xl flex-col gap-8">
      <!-- Updated image handling -->
      <img
        v-if="image"
        :src="getAbsoluteImage(image)"
        class="h-64 w-full object-cover rounded-lg"
        alt="Molki Design Project Preview"
      />
      <!-- Fallback image -->
      <img
        v-else
        :src="`${siteConfig.url}/og-image.jpg`"
        class="h-64 w-full object-cover rounded-lg"
        alt="Molki Design Default Preview"
      />

      <!-- Title -->
      <h1 class="text-5xl font-bold text-primary" v-if="title">
        {{ title }}
      </h1>

      <!-- Description -->
      <p class="text-2xl text-neutral-600" v-if="description">
        {{ description }}
      </p>

      <!-- Logo -->
      <div class="mt-auto flex items-center gap-4">
        <img src="/logo.svg" class="h-12" alt="Molki Design" />
        <span class="text-xl font-medium">Molki Design</span>
      </div>
    </div>
  </div>
</template>
