<script setup lang="ts">
defineProps<{
  ctaLink?: string;
}>();
</script>

<template>
  <section class="py-16" data-scroll-section>
    <div class="content-grid">
      <div class="breakout1">
        <!-- Title and Subtitle -->
        <div v-if="$slots.title" class="text-center mb-16">
          <h2
            class="h2-style font-semibold text-primary mb-4"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            <slot name="title" mdc-unwrap="p" />
          </h2>
          <p
            v-if="$slots.subtitle"
            class="text-xl md:text-2xl text-neutral-800"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            <slot name="subtitle" mdc-unwrap="p" />
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16" v-if="$slots.projects">
          <slot name="projects" />
        </div>

        <!-- Center Button with Line -->
        <FullWidthButton v-if="$slots.cta" :to="ctaLink || '/'">
          <slot name="cta" mdc-unwrap="p" />
        </FullWidthButton>
      </div>
    </div>
  </section>
</template>
