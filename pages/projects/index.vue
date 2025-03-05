<template>
  <main>
    <TitleSection>
      <template #title>Nasze Realizacje</template>
      <template #subtitle>Zobacz wszystkie nasze projekty</template>
    </TitleSection>

    <SquareGrid contentType="projects" orderBy="number" orderDirection="ASC">
      <template #item="{ item }">
        <SquareGridItem
          :key="item.id"
          :to="`/projects/${item.slug}`"
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
</script>
