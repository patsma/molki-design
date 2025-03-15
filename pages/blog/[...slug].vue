<script setup>
const route = useRoute();
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug;

// Fetch the blog post
const { data, error } = await useAsyncData(`blog-${route.path}`, async () => {
  try {
    return await queryCollection('blog').where('slug', '=', slug).first();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
});

// If the blog post doesn't exist or there was an error, throw a 404 error
if (!data.value || error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Artykuł nie został odnaleziony',
    fatal: true,
  });
}

// Debug - log the complete data object to help debug headerSpacing
// console.log('BLOG DATA:', JSON.parse(JSON.stringify(data.value)));

// Get the site config
const siteConfig = useSiteConfig();

// Computed values for SEO
const pageTitle = computed(() => `${data.value?.title} | Molki Design Blog`);
const pageDescription = computed(
  () => data.value?.excerpt || 'Blog Molki Design - projekty wnętrz i porady projektowe'
);

// Use useHead for basic SEO
useHead({
  title: pageTitle,
  htmlAttrs: {
    lang: 'pl',
  },
  link: [
    {
      rel: 'canonical',
      href: `${siteConfig.url}${route.path}`,
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
});

// Use useSeoMeta for meta tags
useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: `${siteConfig.url}${route.path}`,
  ogType: 'article',
  ogSiteName: siteConfig.name,
  articlePublishedTime: data.value?.date,
  articleAuthor: data.value?.author,
  articleSection: data.value?.category,
  twitterCard: 'summary_large_image',
});

// Use defineOgImage for OG image
defineOgImage({
  component: 'OgImage',
  props: {
    title: data.value?.title,
    description: data.value?.excerpt,
    image: data.value?.cover,
  },
});

// Get headerSpacing setting from meta
const needsHeaderSpacing = computed(() => {
  // Check if headerSpacing is explicitly set in frontmatter (in meta object)
  if (data.value?.meta?.headerSpacing === false) {
    // console.log('Blog: headerSpacing is FALSE in frontmatter, no spacing');
    return false;
  }

  if (data.value?.meta?.headerSpacing === true) {
    // console.log('Blog: headerSpacing is TRUE in frontmatter, adding spacing');
    return true;
  }

  // Default for blog pages is to ADD spacing if not specified
  // console.log(
  //   'Blog: headerSpacing not specified in frontmatter, ADDING spacing by default for blog pages'
  // );
  return true;
});

// Format date for display
const formattedDate = computed(() => {
  if (!data.value?.date) return '';

  try {
    const date = new Date(data.value.date);
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch (e) {
    console.error('Error formatting date:', e);
    return data.value.date;
  }
});

// Related posts
const { data: relatedPosts } = await useAsyncData(`related-posts-${route.path}`, async () => {
  try {
    if (!data.value?.category) return [];

    return await queryCollection('blog')
      .where('category', '=', data.value.category)
      .where('slug', '!=', slug)
      .limit(3)
      .all();
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
});
</script>

<template>
  <main :class="{ 'has-header-spacing': needsHeaderSpacing }">
    <div v-if="error" class="content-grid py-32">
      <div class="breakout1 text-center">
        <p class="text-xl text-red-500">{{ error }}</p>
      </div>
    </div>

    <div v-else-if="!data" class="content-grid py-32">
      <div class="breakout1 text-center">
        <p class="text-xl">Loading...</p>
      </div>
    </div>

    <div v-else class="content-grid py-32">
      <div class="breakout1">
        <!-- Blog Post Header -->
        <div class="grid grid-cols-1 gap-8 items-center pb-14">
          <div class="grid">
            <div class="flex items-center gap-4 mb-4">
              <span class="px-3 py-1 text-sm font-medium rounded-full bg-primary text-white">
                {{ data.category }}
              </span>
              <span class="text-neutral-600">{{ formattedDate }}</span>
            </div>
            <h1 class="h2-style text-primary mb-4">{{ data.title }}</h1>
            <p v-if="data.excerpt" class="text-xl text-neutral-600">{{ data.excerpt }}</p>
          </div>
        </div>

        <!-- Featured Image -->
        <div class="mb-12">
          <div class="aspect-[21/9] overflow-hidden rounded-lg">
            <nuxt-img
              :src="data.cover"
              :alt="data.title"
              class="w-full h-full object-cover"
              format="webp"
            />
          </div>
        </div>

        <!-- Blog Content -->
        <div class="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12">
          <div>
            <article class="prose prose-xl max-w-none">
              <ContentRenderer v-if="data.meta?.body" :value="data.meta.body" :excerpt="false" />
            </article>
          </div>

          <!-- Author Info if available -->
          <div v-if="data.author" class="bg-neutral-50 p-6 rounded-lg h-fit">
            <div class="flex items-center gap-4 mb-4">
              <div v-if="data.authorImage" class="w-16 h-16 rounded-full overflow-hidden">
                <nuxt-img
                  :src="data.authorImage"
                  :alt="data.author"
                  class="w-full h-full object-cover"
                  format="webp"
                />
              </div>
              <div>
                <h3 class="font-bold text-lg">{{ data.author }}</h3>
                <p v-if="data.authorRole" class="text-neutral-600">{{ data.authorRole }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Posts -->
        <div v-if="relatedPosts?.length" class="mt-16">
          <h2 class="h3-style text-primary mb-8">Powiązane artykuły</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="relatedPost in relatedPosts"
              :key="relatedPost._id || relatedPost.id"
              class="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2"
            >
              <NuxtLink
                :to="`/blog/${relatedPost.slug}`"
                class="block aspect-[16/9] overflow-hidden"
              >
                <nuxt-img
                  :src="relatedPost.cover"
                  :alt="relatedPost.title"
                  class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  format="webp"
                />
              </NuxtLink>
              <div class="p-4">
                <div class="flex items-center gap-2 mb-2">
                  <span class="px-2 py-1 text-xs font-medium rounded-full bg-primary text-white">
                    {{ relatedPost.category }}
                  </span>
                </div>
                <h3 class="font-bold text-lg mb-2">{{ relatedPost.title }}</h3>
                <p v-if="relatedPost.excerpt" class="text-neutral-600 line-clamp-2">
                  {{ relatedPost.excerpt }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
