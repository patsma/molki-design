<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    limit?: number;
    showButton?: boolean;
  }>(),
  {
    limit: 3,
    showButton: true,
  }
);

// Fetch blog posts from the content collection
const { data: posts } = await useAsyncData('blog-display', async () => {
  try {
    // Create a query for the blog collection
    const query = queryCollection('blog').order('date', 'DESC').limit(props.limit);

    // Execute the query and return all matching results
    return await query.all();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
});

// Format date for display
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (e) {
    console.error('Error formatting date:', e);
    return dateString;
  }
};
</script>

<template>
  <section class="py-16 bg-neutral-50" data-scroll-section>
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
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <div
            v-for="post in posts"
            :key="post.id"
            class="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2"
            data-scroll-item
            data-scroll-animation="fadeUp"
            data-scroll-duration="0.8"
            data-scroll-stagger="0.2"
          >
            <!-- Post Image -->
            <NuxtLink :to="`/blog/${post.slug}`" class="block aspect-[16/9] overflow-hidden">
              <nuxt-img
                :src="post.cover.src"
                :alt="post.cover.alt || post.title"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                format="webp"
              />
            </NuxtLink>

            <!-- Post Content -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-primary text-white">
                  {{ post.category }}
                </span>
                <span class="text-sm text-neutral-500">{{ formatDate(post.date) }}</span>
              </div>

              <NuxtLink :to="`/blog/${post.slug}`" class="block group">
                <h3 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {{ post.title }}
                </h3>
              </NuxtLink>

              <p class="text-neutral-600 mb-4 line-clamp-2">{{ post.excerpt }}</p>

              <NuxtLink
                :to="`/blog/${post.slug}`"
                class="inline-flex items-center text-primary font-medium hover:text-primary-dark"
              >
                Czytaj więcej
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <div v-if="posts?.length === 0" class="col-span-3 text-center py-8">
            <p class="text-neutral-500">Brak artykułów do wyświetlenia.</p>
          </div>
        </div>

        <!-- View All Articles Button -->
        <div
          v-if="showButton && posts?.length > 0"
          class="text-center mt-12"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <BaseButton to="/blog" variant="primary" size="lg" class="font-bold">
            Zobacz wszystkie artykuły
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
