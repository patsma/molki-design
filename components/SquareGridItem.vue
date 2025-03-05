<script setup lang="ts">
// Define common props for both project and blog items with default values
const props = withDefaults(
  defineProps<{
    to: string;
    image: string;
    title: string;
    number?: string;
    location?: string;
    year?: string;
    date?: string;
    category?: string;
    excerpt?: string;
    type?: 'project' | 'blog';
    aspectRatio?: string;
  }>(),
  {
    type: 'project',
    aspectRatio: 'aspect-square',
  }
);

// Compute the subtitle based on the content type
const subtitle = computed(() => {
  if (props.type === 'blog') {
    return props.category && props.date
      ? `${props.category} | ${props.date}`
      : props.category || props.date || '';
  } else {
    return props.location && props.year
      ? `${props.location} | ${props.year}`
      : props.location || props.year || '';
  }
});
</script>

<template>
  <NuxtLink
    :to="to"
    :class="['group block relative overflow-hidden', aspectRatio || 'aspect-square']"
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

    <!-- Number (for projects) or Category Badge (for blogs) -->
    <div
      v-if="number && type === 'project'"
      class="absolute top-6 left-6 text-4xl font-bold transition-colors duration-300 text-primary group-hover:text-white"
    >
      {{ number }}
    </div>
    <div
      v-else-if="category && type === 'blog'"
      class="absolute top-6 left-6 px-3 py-1 text-sm font-medium rounded-full transition-colors duration-300 bg-primary text-white"
    >
      {{ category }}
    </div>

    <!-- Content -->
    <div class="absolute inset-x-0 bottom-0 p-6">
      <div
        class="transform md:translate-y-[150%] transition-transform duration-300 md:group-hover:translate-y-0"
      >
        <h3 class="text-xl font-semibold text-white mb-2">{{ title }}</h3>
        <div class="text-sm text-white/80">{{ subtitle }}</div>
        <p v-if="excerpt && type === 'blog'" class="text-sm text-white/90 mt-2 line-clamp-2">
          {{ excerpt }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
