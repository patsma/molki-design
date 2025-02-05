<script setup lang="ts">
defineProps<{
  name: string;
  customClass?: string;
}>();
</script>

<template>
  <Icon :name="name" :class="customClass || 'w-12 h-12 text-primary mx-auto mb-4'" />
</template>
