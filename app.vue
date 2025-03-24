<script setup>
// Add meta tags for OG Image
useHead({
  meta: [
    {
      property: 'og:site_name',
      content: 'Molki Design',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<!--suppress CssUnknownTarget -->
<style lang="scss">
@use '~/assets/scss/main.scss';
</style>
