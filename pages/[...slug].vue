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

// Get the site config
const siteConfig = useSiteConfig();

// Get SEO data from the page content
const pageTitle = computed(() => {
  const content = page.value as any;
  return content?.seo?.title || content?.title || siteConfig.name;
});

const pageDescription = computed(() => {
  const content = page.value as any;
  return (
    content?.seo?.description ||
    content?.description ||
    'Projekty wnętrz i porady projektowe | Gdańsk, Sopot, Gdynia'
  );
});

// Get image path and ensure it's an absolute URL
const getAbsoluteImageUrl = (imagePath: string) => {
  if (!imagePath) return `${siteConfig.url}/heroHome.jpg`;
  return imagePath.startsWith('http') ? imagePath : `${siteConfig.url}${imagePath}`;
};

const ogImageUrl = computed(() => {
  const content = page.value as any;
  const imagePath = content?.seo?.image || content?.cover || '/heroHome.jpg';
  return getAbsoluteImageUrl(imagePath);
});

// Set up SEO meta tags
useSeoMeta({
  // Basic SEO
  title: pageTitle,
  description: pageDescription,

  // Open Graph
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: ogImageUrl,
  ogUrl: `${siteConfig.url}${route.path}`,
  ogType: 'website',
  ogSiteName: siteConfig.name,

  // Twitter
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: ogImageUrl,
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
      href: `${siteConfig.url}${route.path}`,
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
