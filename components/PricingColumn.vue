<script setup lang="ts">
defineSlots<{
  title?: (props: { mdcUnwrap: string }) => any;
  price?: (props: { mdcUnwrap: string }) => any;
  features?: (props: {}) => any;
  basicPrice?: (props: { mdcUnwrap: string }) => any;
  premiumPrice?: (props: { mdcUnwrap: string }) => any;
  basicFeatures?: (props: {}) => any;
  premiumFeatures?: (props: {}) => any;
}>();
</script>

<template>
  <div class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="bg-primary p-6 text-center">
      <h3 class="text-2xl font-semibold text-white">
        <slot name="title" mdc-unwrap="p" />
      </h3>
    </div>

    <!-- Single Price Version -->
    <div v-if="$slots.price && $slots.features" class="p-8 flex-1 flex flex-col">
      <div class="text-center mb-8">
        <div class="text-4xl font-bold text-primary">
          <slot name="price" mdc-unwrap="p" />
        </div>
      </div>
      <div class="flex-1 prose prose-lg max-w-none">
        <slot name="features" />
      </div>
    </div>

    <!-- Basic/Premium Version -->
    <div v-else-if="$slots.basicPrice || $slots.premiumPrice" class="p-8 flex-1 flex flex-col">
      <div class="mb-8">
        <div class="text-xl font-semibold mb-2">Pakiet Podstawowy</div>
        <div class="text-2xl font-bold text-primary mb-6">
          <slot name="basicPrice" mdc-unwrap="p" />
        </div>
        <div class="prose prose-lg max-w-none">
          <slot name="basicFeatures" />
        </div>
      </div>

      <div v-if="$slots.premiumPrice" class="pt-8 border-t border-neutral-200">
        <div class="text-xl font-semibold text-primary mb-2">Pakiet Premium</div>
        <div class="text-2xl font-bold text-primary mb-6">
          <slot name="premiumPrice" mdc-unwrap="p" />
        </div>
        <div class="prose prose-lg max-w-none">
          <div class="text-sm italic mb-4">
            Zawiera wszystkie elementy z pakietu podstawowego oraz:
          </div>
          <slot name="premiumFeatures" />
        </div>
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
