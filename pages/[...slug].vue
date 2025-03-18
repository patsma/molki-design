<script setup lang="ts">
// Request the page data
const route = useRoute();
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('content').path(route.path).first();
});

// If the page doesn't exist, throw a 404 error
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Strona nie została odnaleziona',
    fatal: true,
  });
}

// Debug - log the complete page object to find where headerSpacing is stored
// console.log('FULL PAGE DATA:', JSON.parse(JSON.stringify(page.value)));

// Get headerSpacing setting from meta
const needsHeaderSpacing = computed(() => {
  if (page.value?.meta?.headerSpacing === false) return false;
  if (page.value?.meta?.headerSpacing === true) return true;
  return false;
});

// Use site config for fallbacks
const config = useRuntimeConfig().public;
const baseUrl = config.siteUrl || 'https://molki-design-2025.netlify.app';

// Set SEO metadata with proper OG image handling
useSeoMeta({
  title: page.value?.seo?.title || page.value?.title || config.site.name,
  ogTitle: page.value?.seo?.title || page.value?.title || config.site.name,
  description: page.value?.seo?.description || page.value?.description || config.site.description,
  ogDescription: page.value?.seo?.description || page.value?.description || config.site.description,
  ogImage: {
    url: page.value?.ogImage ? undefined : `${baseUrl}/__og-image__/image/og.png`,
    alt: page.value?.seo?.title || page.value?.title || config.site.name,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  twitterCard: 'summary_large_image',
});

// Define OG image with fallback
defineOgImage(
  page.value?.ogImage || {
    component: 'Custom',
    props: {
      title: config.site.name,
      description: config.site.description,
      cover: '/og-social-default.jpg',
    },
  }
);
</script>

<template>
  <div :class="[page?.meta?.pageClass, { 'has-header-spacing': needsHeaderSpacing }]">
    <ContentRenderer v-if="page" :value="page" class="" />
  </div>
</template>
