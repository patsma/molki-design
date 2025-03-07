<script setup lang="ts">
import { useHeaderSpacing } from '~/composables/useHeaderSpacing';

const route = useRoute();

// Request the page data
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

// Use the header spacing composable
const needsHeaderSpacing = useHeaderSpacing(page);
</script>

<template>
  <div :class="[page?.meta?.pageClass, { 'has-header-spacing': needsHeaderSpacing }]">
    <ContentRenderer v-if="page" :value="page" class="" />
  </div>
</template>
