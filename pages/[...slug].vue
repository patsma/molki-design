<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first();
});

// Only throw 404 during client-side navigation or non-prerender server-side
if (!page.value && (!process.server || !import.meta.env.NITRO_PRERENDER)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Strona nie została odnaleziona',
    fatal: true,
  });
}

const needsHeaderSpacing = computed(() => {
  if (page.value?.meta?.headerSpacing === false) {
    return false;
  }

  if (page.value?.meta?.headerSpacing === true) {
    return true;
  }

  return false;
});

// Only apply SEO if we have page data or we're not in prerender
if (page.value || !import.meta.env.NITRO_PRERENDER) {
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
  </div>
</template>
