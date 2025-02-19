<script setup lang="ts">
defineProps<{
  href: string;
  icon: string;
}>();
</script>

<template>
  <a :href="href" target="_blank" class="text-primary hover:text-primary-dark">
    <Icon :name="icon" class="w-6 h-6" />
  </a>
</template>
