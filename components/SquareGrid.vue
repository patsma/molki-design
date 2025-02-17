<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
}>();

const { data: projects } = await useAsyncData('projects-grid', () =>
  queryCollection('projects').order('number', 'ASC').all()
);
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
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <template v-if="projects?.length">
            <SquareGridItem
              v-for="project in projects"
              :key="project._id"
              :to="`/projects/${project.slug}`"
              :number="project.number"
              :title="project.title"
              :location="project.location"
              :year="project.year"
              :image="project.cover"
            />
          </template>
          <slot name="items" v-else />
        </div>
      </div>
    </div>
  </section>
</template>
