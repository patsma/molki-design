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
  <div
    class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden"
    v-scroll-anim:fadeUp="{ delay: 0.2 }"
  >
    <div class="bg-primary p-6 text-center" v-scroll-anim:fadeDown>
      <h3 class="text-2xl font-semibold text-white" v-scroll-anim:staggerUp="{ stagger: 0.05 }">
        <slot name="title" mdc-unwrap="p" />
      </h3>
    </div>

    <!-- Single Price Version -->
    <div v-if="$slots.price && $slots.features" class="p-8 flex-1 flex flex-col">
      <div class="text-center mb-8" v-scroll-anim:fadeUp>
        <div class="text-4xl font-bold text-primary" v-scroll-anim:scale>
          <slot name="price" mdc-unwrap="p" />
        </div>
      </div>
      <div class="flex-1 prose prose-lg max-w-none" v-scroll-anim:fadeUp>
        <slot name="features" mdc-unwrap="p" />
      </div>
    </div>

    <!-- Basic/Premium Version -->
    <div v-else-if="$slots.basicPrice || $slots.premiumPrice" class="p-8 flex-1 flex flex-col">
      <div class="mb-8" v-scroll-anim:fadeUp>
        <div class="text-xl font-semibold mb-2" v-scroll-anim:staggerUp>Pakiet Podstawowy</div>
        <div class="text-2xl hidden font-bold text-primary mb-6" v-scroll-anim:scale>
          <slot name="basicPrice" mdc-unwrap="p" />
        </div>
        <div class="prose prose-lg max-w-none" v-scroll-anim:fadeUp>
          <slot name="basicFeatures" />
        </div>
      </div>

      <div v-if="$slots.premiumPrice" class="pt-8 border-t border-neutral-200" v-scroll-anim:fadeUp>
        <div
          class="text-xl font-semibold text-primary mb-2"
          v-scroll-anim:staggerUp="{ stagger: 0.03 }"
        >
          Pakiet Premium
        </div>
        <div class="text-2xl font-bold hidden text-primary mb-6" v-scroll-anim:scale>
          <slot name="premiumPrice" mdc-unwrap="p" />
        </div>
        <div class="prose prose-lg max-w-none">
          <div class="text-sm italic mb-4" v-scroll-anim:fadeUp>
            Zawiera wszystkie elementy z pakietu podstawowego oraz:
          </div>
          <div v-scroll-anim:fadeUp>
            <slot name="premiumFeatures" />
          </div>
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

/* Add smooth transitions for hover effects */
.bg-primary {
  transition: background-color 0.3s ease;
}

.text-primary {
  transition: color 0.3s ease;
}
</style>
