<script setup>
// Check if we have any projects
const { error } = await useAsyncData('projects-check', async () => {
  try {
    const count = await queryCollection('projects').count();
    return null;
  } catch (error) {
    console.error('Error checking projects:', error);
    return error;
  }
});

// Fetch the projects index content if available (could be a content/projects.md file)
const { data } = await useAsyncData('projects-index', async () => {
  try {
    // Try to fetch a potential projects index content file
    return await queryContent('projects').findOne();
  } catch (error) {
    console.log('No specific content file for projects index, using defaults');
    return null;
  }
});

// Apply optimized SEO using the composable
import { usePageSeo } from '~/composables/usePageSeo';
// Create a default page object if no specific data is available
const pageData = computed(() => {
  if (data.value) return data.value;

  return {
    title: 'Nasze Realizacje',
    seo: {
      title: 'Nasze Realizacje - Zobacz nasze projekty',
      description: 'Przeglądaj najnowsze realizacje, projekty i inwestycje z naszego portfolio.',
    },
  };
});

// Apply SEO with error handling
try {
  usePageSeo(pageData);

  // Define OG image with proper component and props
  defineOgImage({
    component: 'Custom',
    props: {
      title: pageData.value?.seo?.title || 'Nasze Realizacje - Molki Design',
      description:
        pageData.value?.seo?.description ||
        'Przeglądaj najnowsze realizacje, projekty i inwestycje z naszego portfolio.',
      cover: pageData.value?.cover || '/og-social-default.jpg',
    },
  });
} catch (e) {
  console.error('Error applying SEO to projects index:', e);
}

// Get headerSpacing setting from meta if available
const needsHeaderSpacing = computed(() => {
  // Check if headerSpacing is explicitly set in frontmatter (in meta object)
  if (data.value?.meta?.headerSpacing === false) {
    return false;
  }

  if (data.value?.meta?.headerSpacing === true) {
    return true;
  }

  // Default for realizacje index is to ADD spacing if not specified
  return true;
});
</script>
<template>
  <main :class="{ 'has-header-spacing': needsHeaderSpacing }">
    <TitleSection class="md:!py-10">
      <template #title>Nasze Realizacje</template>
      <template #subtitle>Zobacz wszystkie nasze projekty</template>
    </TitleSection>

    <SquareGrid contentType="projects" orderBy="number" orderDirection="ASC">
      <template #item="{ item }">
        <SquareGridItem
          :key="item.id"
          :to="`/realizacje/${item.slug}`"
          :number="item.number"
          :title="item.title"
          :location="item.location"
          :year="item.year"
          :image="item.cover"
          type="project"
        />
      </template>
    </SquareGrid>
    <LayoutPreFooterContent />
    <LayoutFooterContent />

    <!-- Debug output -->
    <pre v-if="error" class="p-4 text-red-500">{{ error }}</pre>
  </main>
</template>
