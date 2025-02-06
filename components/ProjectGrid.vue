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
        <div class="text-center mb-16">
          <h2
            v-if="$slots.title"
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
        <div class="grid">
          <div
            v-if="$slots.cta"
            class="relative w-full h-full grid place-items-center"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            <!-- Decorator Line -->
            <div class="absolute w-screen h-[0.15rem] bg-primary"></div>
            <!-- Button -->
            <NuxtLink
              :to="ctaLink || '/'"
              class="relative rounded-md cursor-pointer bg-primary px-8 py-5 tracking-widest text-base font-spartan font-bold text-neutral-100 transition-colors duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <slot name="cta" mdc-unwrap="p" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
