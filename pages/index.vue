<template>
  <div class="content-grid">
    <div class="full-width">
      <ContentRenderer v-if="home" :value="home" />
      <div v-else>Home not found</div>

      <div id="spacer1" class="spacer w-full h-screen bg-red-400"></div>
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
