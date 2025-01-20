<script setup></script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<!--suppress CssUnknownTarget -->
<style lang="scss">
@use "~/assets/scss/main.scss";

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
