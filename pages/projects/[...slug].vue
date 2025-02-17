<script setup>
import { queryCollection } from '#imports';
import { ref, computed } from 'vue';

const route = useRoute();
const fullPath = `/projects/${route.params.slug.join('/')}`;

const { data, error } = await useAsyncData(`project-${route.path}`, () =>
  queryCollection('projects').where('slug', '=', route.params.slug).first()
);

// Debug output
console.log('Project data:', data.value);
console.log('CTA Link:', data.value?.ctaLink);

// Computed property for CTA link with proper fallback chain
const ctaLink = computed(() => {
  // First try the explicit ctaLink from the markdown
  if (data.value?.ctaLink) return data.value.ctaLink;

  // If not set, try to construct from the project data
  if (data.value?.slug) return `/projects/${data.value.slug}`;

  // Final fallback
  return '/projects';
});

const swiperRef = ref(null);

// Initialize swiper with options
useSwiper(swiperRef, {
  effect: 'slide',
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: true,
});
</script>

<template>
  <main>
    <div v-if="data" class="content-grid py-24">
      <div class="breakout1">
        <!-- Project Header -->
        <div class="mb-16 grid grid-cols-1 md:grid-cols-6 gap-8">
          <div class="col-span-4">
            <div class="text-6xl font-bold text-primary mb-4">{{ data.number }}</div>
            <h1 class="h1-style text-primary mb-4">{{ data.title }}</h1>
            <div class="text-xl text-neutral-600">{{ data.location }} | {{ data.year }}</div>
            <!-- Project Images Swiper -->
            <div class="aspect-video overflow-hidden rounded-lg">
              <ClientOnly>
                <swiper-container
                  ref="swiperRef"
                  :loop="true"
                  :pagination="true"
                  class="w-full h-full"
                >
                  <swiper-slide
                    v-for="(image, index) in data.images"
                    :key="index"
                    class="w-full h-full"
                  >
                    <nuxt-img
                      :src="image"
                      :alt="`${data.title} - Image ${index + 1}`"
                      class="w-full h-full object-cover"
                      format="webp"
                    />
                  </swiper-slide>
                </swiper-container>
              </ClientOnly>
            </div>
          </div>
          <div class="grid justify-between content-start col-span-2">
            <p class="text-xl text-neutral-800">{{ data.description }}</p>
            <NuxtLink
              :to="ctaLink"
              class="relative rounded-md cursor-pointer bg-primary px-8 py-5 tracking-widest text-base font-spartan font-bold text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Zobacz więcej"
            >
              {{ data.ctaText || 'ZOBACZ WIĘCEJ' }}
            </NuxtLink>
          </div>
        </div>

        <!-- Project Content -->
        <ContentRenderer :value="data" />
      </div>
    </div>
    <pre v-else class="p-4">Loading...</pre>
  </main>
</template>

<style>
swiper-container {
  @apply w-full h-full;
}

swiper-slide {
  @apply w-full h-full;
}

swiper-container::part(pagination) {
  @apply bottom-4;
}

swiper-container::part(bullet) {
  @apply bg-white opacity-50;
}

swiper-container::part(bullet-active) {
  @apply bg-white opacity-100;
}
</style>
