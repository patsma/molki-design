<template>
  <main>
    <TitleSection>
      <template #title>Nasze Realizacje</template>
      <template #subtitle>Zobacz wszystkie nasze projekty</template>
    </TitleSection>

    <SquareGrid v-if="projects?.length">
      <template #items>
        <SquareGridItem
          v-for="project in projects"
          :key="project._path"
          :to="project._path"
          :number="project.number"
          :title="project.title"
          :location="project.location"
          :year="project.year"
          :image="project.cover"
        />
      </template>
    </SquareGrid>

    <!-- Debug output -->
    <pre v-if="error" class="p-4 text-red-500">{{ error }}</pre>
  </main>
</template>

<script setup>
import { queryCollection } from '#imports';

const { data: projects, error } = await useAsyncData('projects', () =>
  queryCollection('projects').order('year', 'DESC').order('title', 'ASC').all()
);

// Debug output
console.log('Projects data:', projects.value);
console.log('Query error:', error.value);
</script>
