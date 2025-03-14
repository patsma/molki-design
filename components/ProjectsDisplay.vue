<script setup lang="ts">
// Fetch projects from the content collection
const { data: projects } = await useAsyncData('projects-display', async () => {
  try {
    // Create a query for the projects collection
    const query = queryCollection('projects').order('number', 'ASC');

    // Execute the query and return all matching results
    return await query.all();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
});
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

        <!-- Content Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <template v-if="projects?.length">
            <SquareGridItem
              v-for="project in projects"
              :key="project.id"
              :to="`/realizacje/${project.slug}`"
              :image="project.cover"
              :title="project.title"
              :number="project.number"
              :location="project.location"
              :year="project.year"
              type="project"
            />
          </template>
          <div v-else class="col-span-3 text-center py-8">
            <p class="text-neutral-500">Brak projektów do wyświetlenia.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
