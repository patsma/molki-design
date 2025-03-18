import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asOgImageCollection } from 'nuxt-og-image/content';
import { asSitemapCollection } from '@nuxtjs/sitemap/content';

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asSitemapCollection(
        asOgImageCollection({
          type: 'page',
          source: '**/*.md',
        })
      )
    ),
  },
});
