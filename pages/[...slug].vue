<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first();
});

// Only throw 404 during client-side navigation
if (!page.value && process.client) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Strona nie została odnaleziona',
    fatal: true,
  });
}

const needsHeaderSpacing = computed(() => {
  // If page doesn't exist yet, default to true
  if (!page.value) return true;

  // If headerSpacing is explicitly set in meta, respect that setting
  if (page.value.meta?.headerSpacing === false) {
    return false;
  }

  // Default to true for all pages unless explicitly set to false
  return true;
});

// Only apply SEO if we have page data and we're on the client
// or if we're not in prerender mode
if ((page.value && process.client) || !import.meta.env.NITRO_PRERENDER) {
  useSeoMeta({
    title: page.value?.seo?.title,
    description: page.value?.seo?.description,
  });

  // Define OG image with proper component and props
  const ogImageConfig = {
    component: 'Custom',
    props: {
      title: page.value?.seo?.title || page.value?.title || 'Molki Design',
      description:
        page.value?.seo?.description ||
        page.value?.description ||
        'Profesjonalne projekty wnętrz w Trójmieście',
      cover:
        page.value?.ogImage?.props?.cover || (page.value as any)?.cover || '/og-social-default.jpg',
    },
  };

  // If the page has specific OG image config, use it
  if (page.value?.ogImage?.component && page.value?.ogImage?.props) {
    ogImageConfig.component = page.value.ogImage.component;
    ogImageConfig.props = {
      ...ogImageConfig.props,
      ...page.value.ogImage.props,
    };
  }

  defineOgImage(ogImageConfig);
}

// console.log('OG IMAGE:', page.value.ogImage?.props.cover);
</script>

<template>
  <div :class="[page?.meta?.pageClass, { 'has-header-spacing': needsHeaderSpacing }]">
    <ContentRenderer v-if="page" :value="page" class="" />
    <LayoutPreFooterContent />
    <LayoutFooterContent />
  </div>
</template>
