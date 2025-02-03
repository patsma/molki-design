<script setup lang="ts"></script>

<template>
  <div
    class="relative p-8 text-center"
    data-scroll-stagger-group
    data-scroll-animation="fadeUp"
    data-scroll-duration="0.8"
    data-scroll-stagger="0.2"
    data-scroll-order="4"
  >
    <h3 v-if="$slots.title" class="h3-style font-bold text-primary mb-2">
      <slot name="title" mdc-unwrap="p" />
    </h3>
    <div class="w-12 h-0.5 bg-primary mx-auto mb-2"></div>
    <p v-if="$slots.subtitle" class="body-small">
      <slot name="subtitle" mdc-unwrap="p" />
    </p>
  </div>
</template>
