import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asOgImageCollection } from 'nuxt-og-image/content';
import { asSitemapCollection } from '@nuxtjs/sitemap/content';

export default defineContentConfig({
  collections: {
    projects: defineCollection(
      asSitemapCollection({
        type: 'document',
        source: 'projects/*.md',
        schema: z.object({
          title: z.string(),
          subtitle: z.string(),
          slug: z.string(),
          location: z.string(),
          year: z.string(),
          number: z.string(),
          cover: z.string(),
          images: z.array(z.string()),
          ctaText: z.string().optional(),
          ctaLink: z.string().optional(),
        }),
      })
    ),
    blog: defineCollection(
      asSitemapCollection({
        type: 'document',
        source: 'blog/*.md',
        schema: z.object({
          title: z.string(),
          slug: z.string(),
          category: z.string(),
          date: z.string(),
          cover: z.string(),
          excerpt: z.string(),
          author: z.string().optional(),
          authorRole: z.string().optional(),
          authorImage: z.string().optional(),
        }),
      })
    ),
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
