<script setup lang="ts">
// Define image type
interface ImageObject {
  src: string;
  alt?: string;
}

type ImageProp = string | ImageObject;

// Define props for portfolio items
const props = withDefaults(
  defineProps<{
    to: string;
    image: ImageProp;
    title: string;
    location?: string;
    metraz?: string | number;
    aspectRatio?: string;
  }>(),
  {
    aspectRatio: 'aspect-[4/3]', // 4:3 aspect ratio for rectangular images
  }
);

// Normalize image source and alt text
const imageSource = computed(() => {
  return typeof props.image === 'string' ? props.image : props.image.src;
});

const imageAlt = computed(() => {
  return typeof props.image === 'string' ? props.title : props.image.alt || props.title;
});

// Format metraż with m² symbol
const formattedMetraz = computed(() => {
  if (!props.metraz) return '';
  return `${props.metraz} m²`;
});
</script>

<template>
  <NuxtLink
    :to="to"
    class="group block overflow-hidden rounded-lg bg-white transition-all duration-300 ease-in-out shadow hover:-translate-y-1 hover:shadow-xl"
  >
    <!-- Image Container -->
    <div :class="['relative overflow-hidden', aspectRatio]">
      <nuxt-img
        :src="imageSource"
        :alt="imageAlt"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        format="webp"
      />
    </div>

    <!-- Content Below Image -->
    <div class="p-6">
      <!-- Title -->
      <h3
        class="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary transition-colors duration-300"
      >
        {{ title }}
      </h3>

      <!-- Location -->
      <div v-if="location" class="text-neutral-600 mb-2 flex items-center">
        <Icon name="ph:map-pin" class="w-4 h-4 mr-2 text-primary/70" />
        {{ location }}
      </div>

      <!-- Metraż -->
      <div v-if="metraz" class="text-neutral-600 flex items-center">
        <Icon name="uil:square-full" class="w-4 h-4 mr-2 text-primary/70" />
        {{ formattedMetraz }}
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.group {
  transform: translateZ(0); /* Enable GPU acceleration for smoother animations */
}
</style>
