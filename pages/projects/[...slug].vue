<script setup>
import { queryCollection } from '#imports';

const route = useRoute();
const { data } = await useAsyncData(`content-${route.path}`, () =>
  queryCollection('projects')
    .where({
      _file: route.params.slug.join('/'), // Match the file path
    })
    .first()
);

// Debug output
console.log('Route path:', route.path);
console.log('Project data:', data.value);
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
    <!-- Debug output -->
    <pre v-else class="p-4">{{ route.path }}</pre>
  </main>
</template>
