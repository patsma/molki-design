<script setup lang="ts">
defineProps<{
  ctaLink?: string;
  showHeroPath?: boolean;
}>();
</script>

<template>
  <section class="py-16" data-scroll-section>
    <div class="content-grid">
      <div class="breakout1">
        <!-- Title and Subtitle -->
        <div v-if="$slots.title" class="text-center mb-16">
          <h2
            v-scroll-anim:fadeUp="{ sequence: true, sequenceDelay: 0.2 }"
            class="h2-style font-semibold text-primary mb-4"
          >
            <slot name="title" mdc-unwrap="p" />
          </h2>
          <p v-if="$slots.subtitle" class="text-xl md:text-2xl text-neutral-800">
            <slot name="subtitle" mdc-unwrap="p" />
          </p>
        </div>

        <!-- Projects Grid -->
        <div
          v-scroll-anim:staggerUp="{
            stagger: {
              amount: 0.6,
              from: 'start',
              grid: 'auto',
            },
          }"
          class="grid grid-cols-1 md:grid-cols-3 overflow-hidden relative gap-8 md:gap-12 mb-16"
          v-if="$slots.projects"
        >
          <!-- SVG Accent Shape -->
          <div
            v-if="showHeroPath !== false"
            class="absolute -top-1/3 right-0 overflow-hidden z-10 pointer-events-none"
          >
            <HeroPath4 class="h-screen" />
          </div>
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
