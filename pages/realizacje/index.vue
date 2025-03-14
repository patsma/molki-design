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

    <!-- Debug output -->
    <pre v-if="error" class="p-4 text-red-500">{{ error }}</pre>
  </main>
</template>

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

// Debug - log data if available
if (data.value) {
  console.log('REALIZACJE INDEX DATA:', JSON.parse(JSON.stringify(data.value)));
}

// Get headerSpacing setting from meta if available
const needsHeaderSpacing = computed(() => {
  // Check if headerSpacing is explicitly set in frontmatter (in meta object)
  if (data.value?.meta?.headerSpacing === false) {
    // console.log('Realizacje Index: headerSpacing is FALSE in frontmatter, no spacing');
    return false;
  }

  if (data.value?.meta?.headerSpacing === true) {
    // console.log('Realizacje Index: headerSpacing is TRUE in frontmatter, adding spacing');
    return true;
  }

  // Default for realizacje index is to ADD spacing if not specified
  // console.log(
  //   'Realizacje Index: headerSpacing not specified in frontmatter, ADDING spacing by default'
  // );
  return true;
});
</script>
