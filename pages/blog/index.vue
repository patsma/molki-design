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

// Fetch the blog index content if available (could be a content/blog.md file)
const { data } = await useAsyncData('blog-index', async () => {
  try {
    // Try to fetch a potential blog index content file
    return await queryContent('blog').findOne();
  } catch (error) {
    console.log('No specific content file for blog index, using defaults');
    return null;
  }
});

// Apply optimized SEO using the composable
import { usePageSeo } from '~/composables/usePageSeo';
// Create a default page object if no specific data is available
const pageData = computed(() => {
  if (data.value) return data.value;

  return {
    title: 'Blog',
    seo: {
      title: 'Blog - Najnowsze artykuły i porady',
      description: 'Przeglądaj najnowsze artykuły, porady i aktualności z branży projektowej.',
    },
  };
});

// Apply SEO with error handling
try {
  usePageSeo(pageData);

  // Define OG image with proper component and props
  defineOgImage({
    component: 'Custom',
    props: {
      title: pageData.value?.seo?.title || 'Blog - Molki Design',
      description:
        pageData.value?.seo?.description || 'Najnowsze artykuły i porady z branży projektowej',
      cover: pageData.value?.cover || '/og-social-default.jpg',
    },
  });
} catch (e) {
  console.error('Error applying SEO to blog index:', e);
}

// Debug - log data if available
if (data.value) {
  // console.log('BLOG INDEX DATA:', JSON.parse(JSON.stringify(data.value)));
}

// Get headerSpacing setting from meta if available
const needsHeaderSpacing = computed(() => {
  // Check if headerSpacing is explicitly set in frontmatter (in meta object)
  if (data.value?.meta?.headerSpacing === false) {
    // console.log('Blog Index: headerSpacing is FALSE in frontmatter, no spacing');
    return false;
  }

  if (data.value?.meta?.headerSpacing === true) {
    // console.log('Blog Index: headerSpacing is TRUE in frontmatter, adding spacing');
    return true;
  }

  // Default for blog index is to ADD spacing if not specified
  // console.log('Blog Index: headerSpacing not specified in frontmatter, ADDING spacing by default');
  return true;
});
</script>

<template>
  <main :class="{ 'has-header-spacing': needsHeaderSpacing }">
    <FeaturedBlogPosts title="Blog" subtitle="Najnowsze artykuły i porady" :limit="3" />
    <LayoutPreFooterContent />
    <LayoutFooterContent />
    <!-- Debug output -->
    <pre v-if="error" class="p-4 text-red-500">{{ error }}</pre>
  </main>
</template>
