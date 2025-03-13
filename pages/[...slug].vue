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
    console.log('headerSpacing is FALSE in frontmatter, no spacing');
    return false;
  }

  if (page.value?.meta?.headerSpacing === true) {
    console.log('headerSpacing is TRUE in frontmatter, adding spacing');
    return true;
  }

  // Default (if not specified)
  console.log('headerSpacing not specified in frontmatter, no spacing by default');
  return false;
});

// Set up simple SEO meta tags including OG image
useSeoMeta({
  // Basic SEO
  title: page.value?.title || 'Molki Design',
  description:
    page.value?.description || 'Projekty wnętrz i porady projektowe | Gdańsk, Sopot, Gdynia',

  // Open Graph
  ogTitle: page.value?.title || 'Molki Design',
  ogDescription:
    page.value?.description || 'Projekty wnętrz i porady projektowe | Gdańsk, Sopot, Gdynia',
  ogImage: page.value?.cover || '/heroHome.jpg', // Use page cover or default image
  ogUrl: `https://molki-design-2025.netlify.app${route.path}`,
  ogType: 'website',
  ogSiteName: 'Molki Design',

  // Twitter
  twitterTitle: page.value?.title || 'Molki Design',
  twitterDescription:
    page.value?.description || 'Projekty wnętrz i porady projektowe | Gdańsk, Sopot, Gdynia',
  twitterImage: page.value?.cover || '/heroHome.jpg',
  twitterCard: 'summary_large_image',
});

// Set HTML attributes and links
useHead({
  htmlAttrs: {
    lang: 'pl',
  },
  link: [
    {
      rel: 'canonical',
      href: `https://molki-design-2025.netlify.app${route.path}`,
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
});
</script>

<template>
  <div :class="[page?.meta?.pageClass, { 'has-header-spacing': needsHeaderSpacing }]">
    <ContentRenderer v-if="page" :value="page" class="" />
  </div>
</template>
