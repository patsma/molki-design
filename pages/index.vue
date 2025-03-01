<template>
  <div class="content-grid">
    <div class="full-width">
      <ContentRenderer v-if="home" :value="home" />
      <div v-else>Home not found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first());

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
});
// console.log(home.value?.body);
</script>
