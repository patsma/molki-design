<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first();
});
</script>

<template>
  <div :class="page?.meta?.pageClass">
    <ContentRenderer v-if="page" :value="page" class="" />
    <div v-else>Page not found</div>
  </div>
</template>
