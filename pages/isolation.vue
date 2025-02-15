<template>
  <div class="content-grid py-20">
    <div class="spacer w-full h-[25vh] bg-red-400"></div>

    <SquareGrid v-if="projects?.length">
      <template #title>Nasze Realizacje</template>
      <template #subtitle>Zobacz nasze najnowsze projekty</template>
      <template #items>
        <SquareGridItem
          v-for="project in projects"
          :key="project.id"
          :to="`/projects/${project.slug}`"
          :number="project.number"
          :title="project.title"
          :location="project.location"
          :year="project.year"
          :image="project.cover"
        />
      </template>
    </SquareGrid>

    <div class="spacer w-full h-[250vh] bg-teal-400"></div>
  </div>
</template>

<script setup>
import { queryCollection } from '#imports';

const { data: projects } = await useAsyncData('isolation-projects', () =>
  queryCollection('projects').order('number', 'ASC').all()
);
</script>
