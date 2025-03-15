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

useSeoMeta({
  title: page.value?.seo?.title || 'Nuxt OG Image',
  description:
    page.value?.seo?.description ||
    'The quickest and easiest way to build Open Graph images for Nuxt.',
});
if (page.value.ogImage) {
  defineOgImage(page.value.ogImage);
}
</script>

<template>
  <div :class="[page?.meta?.pageClass, { 'has-header-spacing': needsHeaderSpacing }]">
    <ContentRenderer v-if="page" :value="page" class="" />
  </div>
</template>
