<template>
  <main>
    <TitleSection>
      <template #title>Blog</template>
      <template #subtitle>Najnowsze artykuły i porady</template>
    </TitleSection>

    <SquareGrid contentType="blog" orderBy="date" orderDirection="DESC">
      <template #item="{ item }">
        <SquareGridItem
          :key="item._id || item.id"
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

    <!-- Debug output -->
    <pre v-if="error" class="p-4 text-red-500">{{ error }}</pre>
  </main>
</template>

<script setup>
// Check if we have any blog posts
const { error } = await useAsyncData('blog-check', async () => {
  try {
    const count = await queryCollection('blog').count();
    return null;
  } catch (error) {
    console.error('Error checking blog posts:', error);
    return error;
  }
});
</script>
