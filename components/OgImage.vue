<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  image?: string;
}>();
</script>

<template>
  <div class="flex h-full w-full items-center justify-center bg-white p-16">
    <div class="flex max-w-5xl flex-col gap-8">
      <!-- Image if provided -->
      <img v-if="image" :src="image" class="h-64 w-full object-cover rounded-lg" />

      <!-- Title -->
      <h1 class="text-5xl font-bold text-primary" v-if="title">
        {{ title }}
      </h1>

      <!-- Description -->
      <p class="text-2xl text-neutral-600" v-if="description">
        {{ description }}
      </p>

      <!-- Logo -->
      <div class="mt-auto flex items-center gap-4">
        <img src="/logo.svg" class="h-12" alt="Molki Design" />
        <span class="text-xl font-medium">Molki Design</span>
      </div>
    </div>
  </div>
</template>
