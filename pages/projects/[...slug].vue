<script setup>
const { path } = useRoute();
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent('projects').where({ _path: path }).findOne();
});
</script>

<template>
  <div v-if="data">
    <!-- Project content will go here -->
  </div>
</template>
