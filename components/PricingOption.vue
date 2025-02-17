<script setup lang="ts">
defineProps<{
  title: string;
  price: string;
}>();
</script>

<template>
  <div class="text-center p-8 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-semibold text-primary mb-4">{{ title }}</h3>
    <p class="text-2xl font-bold text-neutral-800">{{ price }}</p>
  </div>
</template>
