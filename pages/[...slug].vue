<script setup lang="ts">
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

// Determine if header spacing should be applied
// Default is true - add spacing unless explicitly disabled
const needsHeaderSpacing = computed(() => {
  // Type assertion for accessing custom frontmatter properties
  const pageData = page.value as any;

  // If headerSpacing is explicitly set to false, don't add spacing
  // Otherwise add spacing by default
  return pageData?.headerSpacing !== false;
});

// Get header height for debug display
const headerHeightValue = ref('');

// Debug class application
if (process.client) {
  onMounted(() => {
    console.log('[DEBUG] needsHeaderSpacing computed value:', needsHeaderSpacing.value);
    console.log('[DEBUG] CSS classes being applied:', [
      page.value?.meta?.pageClass,
      { 'has-header-spacing': needsHeaderSpacing.value },
    ]);

    try {
      // Check CSS variables
      headerHeightValue.value = getComputedStyle(document.documentElement).getPropertyValue(
        '--header-height'
      );
    } catch (e) {
      console.error('Error getting header height:', e);
    }
  });
}
</script>

<template>
  <div :class="[page?.meta?.pageClass, { 'has-header-spacing': needsHeaderSpacing }]">
    <ContentRenderer v-if="page" :value="page" class="" />
  </div>
</template>
