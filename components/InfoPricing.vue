<script setup lang="ts">
// No props needed, but we'll handle the content properly
</script>

<template>
  <section class="py-16" data-scroll-section>
    <div class="content-grid">
      <div class="breakout1">
        <!-- Title -->
        <h2
          v-if="$slots.title"
          class="h2-style text-center font-semibold text-primary mb-16"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <slot name="title" mdc-unwrap="p" />
        </h2>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <!-- Image Column -->
          <div
            class="aspect-square overflow-hidden"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            <slot name="image" mdc-unwrap="p" />
          </div>

          <!-- Content Column -->
          <div data-scroll-item data-scroll-animation="fadeUp" data-scroll-duration="1">
            <article class="prose prose-xl max-w-none">
              <ContentRenderer :value="{ body: $slots.content }">
                <template #empty>
                  <slot name="content" mdc-unwrap="p" />
                </template>
              </ContentRenderer>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
