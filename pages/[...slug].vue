<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first();
});

if (!page.value) {
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

useSeoMeta({
  title: page.value?.seo?.title,

  description: page.value?.seo?.description,
});

if (page.value.ogImage?.props.cover) {
  defineOgImage(page.value.ogImage?.props.cover);
}

console.log('OG IMAGE:', page.value.ogImage?.props.cover);
</script>

<template>
  <div :class="[page?.meta?.pageClass, { 'has-header-spacing': needsHeaderSpacing }]">
    <ContentRenderer v-if="page" :value="page" class="" />
  </div>
</template>
