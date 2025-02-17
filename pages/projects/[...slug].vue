<script setup>
import { queryCollection } from '#imports';
import { ref, computed } from 'vue';

const route = useRoute();
const fullPath = `/projects/${route.params.slug.join('/')}`;
const swiperRef = ref(null);

const { data } = await useAsyncData(`project-${route.path}`, () =>
  queryCollection('projects').where('slug', '=', route.params.slug).first()
);

// Debug output
console.log('Project data:', data.value);
console.log('Markdown content:', data.value?.meta?.body?.value);

const ctaLink = computed(() => {
  if (data.value?.ctaLink) return data.value.ctaLink;
  if (data.value?.slug) return `/projects/${data.value.slug}`;
  return '/projects';
});
</script>

<template>
  <main>
    <div v-if="data" class="content-grid py-32">
      <div class="breakout1">
        <div class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 items-center pb-14">
          <div class="grid grid-flow-col justify-start gap-8">
            <div class="text-6xl font-bold text-primary">{{ data.number }}</div>
            <div class="grid">
              <h1 class="h3-style text-primary">{{ data.title }}</h1>
              <div class="text-xl text-neutral-600">{{ data.location }} | {{ data.year }}</div>
            </div>
          </div>
          <div class="grid text-center">
            <NuxtLink
              :to="ctaLink"
              class="relative rounded-md cursor-pointer bg-primary px-8 py-5 tracking-widest text-base font-spartan font-bold text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Zobacz więcej"
            >
              {{ data.ctaText || 'ZOBACZ WIĘCEJ' }}
            </NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8">
          <div class="grid">
            <div class="aspect-video overflow-hidden rounded-lg">
              <ClientOnly>
                <swiper-container
                  ref="swiperRef"
                  :loop="true"
                  :pagination="true"
                  :autoplay="{
                    delay: 3000,
                    disableOnInteraction: false,
                  }"
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
          <div class="grid">
            <article class="prose prose-xl max-w-none">
              <ContentRenderer
                v-if="data?.meta?.body"
                :value="{ body: data.meta.body }"
                :excerpt="false"
              />
            </article>
          </div>
        </div>
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

/* Prose Styling */
.prose {
  @apply text-neutral-800;
}

.prose h1 {
  @apply text-4xl font-bold mb-6 mt-8;
}

.prose h2 {
  @apply text-3xl font-bold mb-4 mt-8;
}

.prose h3 {
  @apply text-2xl font-bold mb-3 mt-6;
}

.prose p {
  @apply text-xl leading-relaxed mb-4;
}

.prose ul {
  @apply my-4 space-y-2;
}

.prose ol {
  @apply my-4 space-y-2 list-decimal;
}

.prose li {
  @apply text-xl leading-relaxed ml-4;
}

.prose a {
  @apply text-primary hover:text-primary-dark transition-colors duration-200 font-semibold;
}

.prose blockquote {
  @apply border-l-4 border-primary pl-4 italic my-4;
}

.prose code {
  @apply bg-neutral-100 rounded px-1.5 py-0.5 text-base font-mono;
}

.prose pre {
  @apply bg-neutral-900 text-white p-4 rounded-lg overflow-x-auto my-4;
}

.prose img {
  @apply rounded-lg shadow-lg my-6;
}

.prose table {
  @apply w-full my-6;
}

.prose table th {
  @apply bg-neutral-100 p-2 text-left font-bold;
}

.prose table td {
  @apply border-t border-neutral-200 p-2;
}

.prose hr {
  @apply my-8 border-neutral-200;
}

/* Dark mode adjustments if needed */
.dark .prose {
  @apply text-neutral-200;
}

.dark .prose a {
  @apply text-primary-light hover:text-primary;
}

.dark .prose code {
  @apply bg-neutral-800 text-neutral-200;
}

.dark .prose blockquote {
  @apply border-primary-light;
}
</style>
