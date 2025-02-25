<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first();
});

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found yet', fatal: true });
}

// Use type assertion to access custom frontmatter properties
interface PageMeta {
  pageClass?: string;
  maxWidth?: 'narrow' | 'medium' | 'full';
}

// Set the page class if specified in frontmatter
const pageClass = computed(() => (page.value as unknown as PageMeta)?.pageClass || '');
const contentWidth = computed(() => {
  const meta = page.value as unknown as PageMeta;
  if (meta?.maxWidth === 'narrow') {
    return 'max-w-3xl mx-auto px-4';
  } else if (meta?.maxWidth === 'medium') {
    return 'max-w-5xl mx-auto px-4';
  }
  return 'full-width';
});
</script>

<template>
  <div :class="['content-grid', pageClass]">
    <div :class="contentWidth">
      <ContentRenderer class="prose prose-lg max-w-none my-8" v-if="page" :value="page" />
      <div v-else>Page not found</div>
    </div>
  </div>
</template>

<style>
.todo-page {
  background-color: #f9f9f9;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.todo-page .prose h1 {
  color: var(--color-primary);
  margin-bottom: 2rem;
}

.todo-page .prose h2 {
  margin-top: 2rem;
  color: var(--color-secondary);
}
</style>
