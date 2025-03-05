<template>
  <div>
    <!-- Test FeaturedBlogPosts Component -->
    <section class="content-grid py-24">
      <div class="content">
        <h2 class="text-3xl font-bold mb-8">Test Blog Components</h2>

        <!-- Featured Blog Posts -->
        <FeaturedBlogPosts title="Blog" subtitle="Najnowsze artykuły i porady" :limit="3" />

        <!-- Test SquareGrid with Blog Posts -->
        <div class="mt-16">
          <h2 class="text-3xl font-bold mb-8">Test SquareGrid with Blog Posts</h2>
          <SquareGrid contentType="blog" orderBy="date" orderDirection="DESC" :limit="2">
            <template #item="{ item }">
              <SquareGridItem
                :key="item.id"
                :to="`/blog/${item.slug}`"
                :title="item.title"
                :category="item.category"
                :date="item.date"
                :image="item.cover"
                :excerpt="item.excerpt"
                type="blog"
                aspectRatio="aspect-[4/3]"
              />
            </template>
          </SquareGrid>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
</script>
