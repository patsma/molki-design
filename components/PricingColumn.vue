<script setup lang="ts">
defineSlots<{
  title?: (props: { mdcUnwrap: string }) => any;
  price?: (props: { mdcUnwrap: string }) => any;
  features?: (props: {}) => any;
}>();
</script>

<template>
  <div class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="bg-primary p-6 text-center">
      <h3 class="text-2xl font-semibold text-white">
        <slot name="title" mdc-unwrap="p" />
      </h3>
    </div>
    <div class="p-8 flex-1 flex flex-col">
      <div class="text-center mb-8">
        <div class="text-4xl font-bold text-primary">
          <slot name="price" mdc-unwrap="p" />
        </div>
      </div>
      <div class="flex-1 prose prose-lg max-w-none">
        <slot name="features" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose :deep(ul) {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.prose :deep(li) {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose :deep(li::before) {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary);
}
</style>
