<script setup>
const route = useRoute();
const fullPath = `/projects/${route.params.slug.join('/')}`;
const swiperRef = ref(null);

const { data } = await useAsyncData(`project-${route.path}`, async () => {
  try {
    return await queryCollection('projects').where('slug', '=', route.params.slug).first();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
});

// Debug output
// console.log('Project data:', data.value);
// console.log('Markdown content:', data.value?.meta?.body?.value);

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
