<script setup>
import { queryCollection } from '#imports';
import { ref } from 'vue';

const route = useRoute();
const fullPath = `/projects/${route.params.slug.join('/')}`;

const { data, error } = await useAsyncData(`project-${route.path}`, () =>
  queryCollection('projects').where('slug', '=', route.params.slug).first()
);

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
        <!-- Project Images Swiper -->
        <div class="mb-16 aspect-video overflow-hidden rounded-lg">
          <ClientOnly>
            <swiper-container ref="swiperRef" :loop="true" :pagination="true" class="w-full h-full">
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

        <!-- Project Header -->
        <div class="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div class="text-6xl font-bold text-primary mb-4">{{ data.number }}</div>
            <h1 class="h1-style text-primary mb-4">{{ data.title }}</h1>
            <div class="text-xl text-neutral-600">{{ data.location }} | {{ data.year }}</div>
          </div>
          <div class="flex flex-col justify-between">
            <p class="text-xl text-neutral-800">{{ data.description }}</p>
            <NuxtLink :to="data.ctaLink" class="btn btn-primary mt-8 self-start">
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
