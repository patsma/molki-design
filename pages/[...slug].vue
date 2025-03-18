<script setup lang="ts">
// Request the page data
const route = useRoute();
const { data: page } = await useAsyncData('page-' + route.path, () => {
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
  // Check if headerSpacing is explicitly set in frontmatter (in meta object)
  if (page.value?.meta?.headerSpacing === false) {
    // console.log('headerSpacing is FALSE in frontmatter, no spacing');
    return false;
  }

  if (page.value?.meta?.headerSpacing === true) {
    // console.log('headerSpacing is TRUE in frontmatter, adding spacing');
    return true;
  }

  // Default (if not specified)
  // console.log('headerSpacing not specified in frontmatter, no spacing by default');
  return false;
});

// Get site config for fallbacks
const config = useRuntimeConfig();
const baseUrl = config.public.siteUrl || 'https://molki-design-2025.netlify.app';

// Set SEO metadata with proper OG image handling
useSeoMeta({
  title: page.value?.seo?.title || page.value?.title || 'Molki Design',
  ogTitle: page.value?.seo?.title || page.value?.title || 'Molki Design',
  description:
    page.value?.seo?.description ||
    page.value?.description ||
    'Profesjonalne projekty wnętrz w Trójmieście',
  ogDescription:
    page.value?.seo?.description ||
    page.value?.description ||
    'Profesjonalne projekty wnętrz w Trójmieście',
  ogImage: {
    url: page.value?.ogImage ? undefined : `${baseUrl}/__og-image__/image/og.png`,
    alt: page.value?.seo?.title || page.value?.title || 'Molki Design',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  },
  twitterCard: 'summary_large_image',
});

// Define OG image with fallback
if (page.value?.ogImage) {
  defineOgImage({
    component: 'Custom',
    props: {
      title: page.value.ogImage.props?.title || page.value.title || 'Molki Design',
      description:
        page.value.ogImage.props?.description ||
        page.value.description ||
        'Profesjonalne projekty wnętrz w Trójmieście',
      cover: page.value.ogImage.props?.cover || '/og-social-default.jpg',
    },
  });
} else {
  defineOgImage({
    component: 'Custom',
    props: {
      title: 'Molki Design',
      description: 'Profesjonalne projekty wnętrz w Trójmieście',
      cover: '/og-social-default.jpg',
    },
  });
}
</script>

<template>
  <div :class="[page?.meta?.pageClass, { 'has-header-spacing': needsHeaderSpacing }]">
    <ContentRenderer v-if="page" :value="page" class="" />
  </div>
</template>
