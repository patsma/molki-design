<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first();
});

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

// Add page-specific class and container width
onMounted(() => {
  if (route.path === '/todo') {
    document.body.classList.add('todo-page');
  }

  return () => {
    if (route.path === '/todo') {
      document.body.classList.remove('todo-page');
    }
  };
});

// Determine if this is the todo page
const isTodoPage = computed(() => route.path === '/todo');
</script>

<template>
  <div :class="page?.meta?.pageClass">
    <ContentRenderer v-if="page" :value="page" class="prose" />
    <div v-else>Page not found</div>
  </div>
</template>
