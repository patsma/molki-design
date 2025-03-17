<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
    limit?: number;
  }>(),
  {
    title: 'Nasze Realizacje',
    subtitle: 'Zobacz wszystkie nasze projekty',
    orderBy: 'number',
    orderDirection: 'ASC',
    limit: 0,
  }
);

// Fetch projects content
const { data: projects } = await useAsyncData('projects-listing', async () => {
  try {
    let query = queryCollection('projects' as any).order(
      props.orderBy as any,
      props.orderDirection
    );

    if (props.limit > 0) {
      query = query.limit(props.limit);
    }

    return await query.all();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
});
</script>

<template>
  <section class="py-10" data-scroll-section>
    <div class="content-grid">
      <div class="breakout1">
        <!-- Title and Subtitle -->
        <div class="text-center mb-16">
          <h2
            class="h2-style font-semibold text-primary mb-4"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            {{ title }}
          </h2>
          <p
            class="text-xl md:text-2xl text-neutral-800"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="1"
          >
            {{ subtitle }}
          </p>
        </div>

        <!-- Projects Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <SquareGridItem
            v-for="project in projects"
            :key="project.id"
            :to="`/realizacje/${project.slug}`"
            :number="project.number"
            :title="project.title"
            :location="project.location"
            :year="project.year"
            :image="project.cover"
            type="project"
          />
        </div>
      </div>
    </div>
  </section>
</template>
