<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    limit?: number;
  }>(),
  {
    title: 'Blog',
    subtitle: 'Najnowsze artykuły i porady',
    limit: 3,
  }
);

// Fetch the latest blog posts
const { data: posts } = await useAsyncData('featured-blog-posts', async () => {
  try {
    return await queryCollection('blog' as any)
      .order('date' as any, 'DESC')
      .limit(props.limit)
      .all();
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
                :src="post.cover"
                :alt="post.title"
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
        </div>

        <!-- View All Button -->
        <div
          class="text-center mt-12"
          data-scroll-item
          data-scroll-animation="fadeUp"
          data-scroll-duration="1"
        >
          <NuxtLink
            to="/blog"
            class="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
          >
            Zobacz wszystkie artykuły
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
