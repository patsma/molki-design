<script setup lang="ts">
defineProps<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}>();
</script>

<template>
  <div
    class="absolute w-12 h-12"
    :class="{
      'top-0 left-0': position === 'top-left',
      'top-0 right-0': position === 'top-right',
      'bottom-0 left-0': position === 'bottom-left',
      'bottom-0 right-0': position === 'bottom-right',
    }"
  >
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="{
        'rotate-0': position === 'top-left',
        'rotate-90': position === 'top-right',
        'rotate-270': position === 'bottom-left',
        'rotate-180': position === 'bottom-right',
      }"
    >
      <path d="M2 2V32C2 40.8366 9.16344 48 18 48H48" stroke="currentColor" stroke-width="3" />
    </svg>
  </div>
</template>
