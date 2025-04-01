<script setup lang="ts"></script>

<template>
  <div class="relative p-4 md:p-8 text-center">
    <h3 v-if="$slots.title" class="h2-style font-bold text-primary mb-2">
      <slot name="title" mdc-unwrap="p" />
    </h3>
    <div class="w-12 h-0.5 bg-primary mx-auto mb-2"></div>
    <p v-if="$slots.subtitle" class="text-xl">
      <slot name="subtitle" mdc-unwrap="p" />
    </p>
  </div>
</template>
