<script setup lang="ts"></script>

<template>
  <div
    class="text-center"
    data-scroll-stagger-group
    data-scroll-animation="fadeUp"
    data-scroll-duration="0.8"
    data-scroll-stagger="0.2"
  >
    <slot name="icon">
      <Icon name="uil:check-circle" class="w-12 h-12 text-primary mx-auto mb-4" />
    </slot>
    <p class="text-lg font-medium text-neutral-800">
      <slot name="text" mdc-unwrap="p" />
    </p>
  </div>
</template>
