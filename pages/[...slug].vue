<script setup lang="ts">
import { queryCollection, useRoute } from '#imports';

const route = useRoute();
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('content').path(route.path).first();
});

// Use site config for fallbacks
const { $config } = useNuxtApp();

useSeoMeta({
  title: page.value?.seo?.title || $config.public.site.name,
  ogTitle: page.value?.seo?.title || $config.public.site.name,
  description: page.value?.seo?.description || $config.public.site.description,
  ogDescription: page.value?.seo?.description || $config.public.site.description,
  ogImage: {
    url: page.value?.ogImage ? undefined : `${$config.public.site.url}/__og-image__/image/og.png`,
    alt: page.value?.seo?.title || $config.public.site.name,
    width: 1200,
    height: 630,
    type: 'image/png',
  },
  twitterCard: 'summary_large_image',
});

// Always define OG image with fallback
defineOgImage(
  page.value?.ogImage || {
    title: $config.public.site.name,
    description: $config.public.site.description,
    cover: '/alpine-0.png',
  }
);
</script>

<template>
  <div>
    <ContentRenderer v-if="page" :value="page" />
    <div v-else>Page not found</div>
  </div>
</template>
