<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    limit?: number;
    category?: string;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
  }>(),
  {
    limit: 0,
    orderBy: 'date',
    orderDirection: 'DESC',
  }
);

// Fetch blog posts from the content collection
const { data: posts } = await useAsyncData('blog-grid', async () => {
  try {
    // Create a query for the blog collection
    let query = queryCollection('blog').order(props.orderBy, props.orderDirection);

    // Apply category filter if specified
    if (props.category) {
      query = query.where('category', '==', props.category);
    }

    // Apply limit if specified
    if (props.limit > 0) {
      query = query.limit(props.limit);
    }

    // Execute the query and return all matching results
    return await query.all();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
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

        <!-- Blog Posts Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <template v-if="posts?.length">
            <SquareGridItem
              v-for="post in posts"
              :key="post.id"
              :to="`/blog/${post.slug}`"
              :title="post.title"
              :category="post.category"
              :date="post.date"
              :image="post.cover"
              :excerpt="post.excerpt"
              type="blog"
              aspectRatio="aspect-[4/3]"
            />
          </template>
          <div v-else class="col-span-3 text-center py-8">
            <p class="text-neutral-500">Brak artykułów do wyświetlenia.</p>
          </div>
        </div>

        <!-- View All Button -->
        <div
          v-if="$slots.button"
          class="text-center mt-12"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <slot name="button" />
        </div>
      </div>
    </div>
  </section>
</template>
