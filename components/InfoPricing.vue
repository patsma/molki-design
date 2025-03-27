<script setup lang="ts">
// No props needed, but we'll handle the content properly
</script>

<template>
  <section class="py-16">
    <div class="content-grid">
      <div class="breakout1">
        <!-- Title -->
        <h2
          v-if="$slots.title"
          class="h2-style text-center font-semibold text-primary mb-16"
          v-scroll-anim:splitText="{ type: 'words', stagger: 0.02, delay: 0.2 }"
        >
          <slot name="title" mdc-unwrap="p" />
        </h2>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <!-- Image Column -->
          <div class="aspect-square overflow-hidden" v-scroll-anim:fadeLeft="{ delay: 0.3 }">
            <div>
              <slot name="image" mdc-unwrap="p" />
            </div>
          </div>

          <!-- Content Column -->
          <div v-scroll-anim:fadeRight="{ delay: 0.5 }">
            <article class="prose prose-xl max-w-none">
              <ContentRenderer
                :value="{ body: $slots.content }"
                v-scroll-anim:staggerUp="{ stagger: 0.1, delay: 0.6 }"
              >
                <template #empty>
                  <div v-scroll-anim:staggerUp="{ stagger: 0.1, delay: 0.6 }">
                    <slot name="content" mdc-unwrap="p" />
                  </div>
                </template>
              </ContentRenderer>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prose :deep(p) {
  margin-bottom: 1.5em;
}

.prose :deep(h3) {
  color: var(--color-primary);
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}

/* Add smooth transitions */
.aspect-square {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.aspect-square:hover {
  transform: scale(1.02);
}

:deep(img) {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.aspect-square:hover :deep(img) {
  transform: scale(1.1);
}
</style>
