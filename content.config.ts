import { defineCollection, defineContentConfig } from '@nuxt/content';
import { asSitemapCollection } from '@nuxtjs/sitemap/content';

export default defineContentConfig({
  collections: {
    projects: defineCollection(
      asSitemapCollection({
        type: 'document',
        source: 'projects/*.md',
      })
    ),
    content: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: '**/*.md',
      })
    ),
  },
});
