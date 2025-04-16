<script setup>
// Check if we have any publikacje
const { error } = await useAsyncData('publikacje-check', async () => {
  try {
    const count = await queryCollection('publikacje').count();
    console.log('Publications count:', count);
    return null;
  } catch (error) {
    console.error('Error checking publikacje:', error);
    return error;
  }
});

// Fetch all publications
const { data: publications } = await useAsyncData('publikacje-list', async () => {
  try {
    return await queryCollection('publikacje').all();
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
});

// Apply optimized SEO using the composable
import { usePageSeo } from '~/composables/usePageSeo';

const pageData = computed(() => ({
  title: 'Publikacje',
  seo: {
    title: 'Publikacje - Zobacz nasze publikacje',
    description: 'Przeglądaj nasze publikacje i artykuły w prasie.',
  },
}));

// Apply SEO with error handling
try {
  usePageSeo(pageData);

  // Define OG image with proper component and props
  defineOgImage({
    component: 'Custom',
    props: {
      title: pageData.value?.seo?.title || 'Publikacje - Molki Design',
      description:
        pageData.value?.seo?.description || 'Przeglądaj nasze publikacje i artykuły w prasie.',
      cover: pageData.value?.cover || '/og-social-default.jpg',
    },
  });
} catch (e) {
  console.error('Error applying SEO to publikacje index:', e);
}

// Get headerSpacing setting from meta if available
const needsHeaderSpacing = computed(() => {
  return true; // Default for publikacje index is to ADD spacing
});
</script>

<template>
  <main :class="{ 'has-header-spacing': needsHeaderSpacing }">
    <TitleSection class="md:!py-10">
      <template #title>Publikacje</template>
      <template #subtitle>Zobacz nasze publikacje w mediach</template>
    </TitleSection>

    <div class="content-grid py-16">
      <div class="breakout1">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-12">
          <a
            v-for="publication in publications"
            :key="publication._id"
            :href="publication.pdfUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="publication-item max-w-[300px] mx-auto w-full"
            v-scroll-anim:staggerUp="{ sequence: true, delay: 0.5 }"
          >
            <div class="relative aspect-[3/4] overflow-hidden group">
              <nuxt-img
                :src="publication.cover.src"
                :alt="publication.cover.alt"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                format="webp"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <span class="text-white font-bold tracking-wider">ZOBACZ PDF</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <LayoutPreFooterContent />
    <LayoutFooterContent />

    <!-- Debug output -->
    <pre v-if="error" class="p-4 text-red-500">{{ error }}</pre>
  </main>
</template>

<style lang="scss" scoped>
.publication-item {
  @apply block;

  &:hover {
    .publication-image {
      @apply scale-110;
    }
  }
}
</style>
