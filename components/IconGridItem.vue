<template>
  <div
    class="text-center"
    data-scroll-item
    data-scroll-animation="fadeUp"
    data-scroll-duration="0.8"
    data-scroll-stagger="0.2"
  >
    <slot name="icon">
      <Icon name="uil:check-circle" class="w-16 h-16 text-primary mx-auto mb-4" />
    </slot>
    <p class="text-lg font-medium text-neutral-800">
      <slot name="text" mdc-unwrap="p" />
    </p>
  </div>
</template>

<style lang="scss"></style>
