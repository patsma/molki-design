<script setup>
import { queryCollection } from '#imports';

const route = useRoute();

// Proper path construction with collection prefix
const fullPath = `/projects/${route.params.slug.join('/')}`;

const { data, error } = await useAsyncData(`project-${route.path}`, () =>
  queryCollection('projects')
    .path(fullPath) // Use the path() method correctly
    .first()
);

console.log('Project data:', data.value);
if (error.value) console.error('Query error:', error.value);
</script>

<template>
  <main>
    <div v-if="data" class="content-grid py-24">
      <div class="breakout1">
        <!-- Project Header -->
        <header class="mb-16">
          <h1 class="h1-style text-primary mb-4">{{ data.title }}</h1>
          <div class="text-xl text-neutral-600">{{ data.location }} | {{ data.year }}</div>
        </header>

        <!-- Project Content -->
        <ContentRenderer :value="data" />
      </div>
    </div>
    <pre v-else class="p-4">Loading...</pre>
  </main>
</template>
