import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asOgImageCollection } from 'nuxt-og-image/content';

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asOgImageCollection({
        type: 'page',
        source: '**/*.md',
        schema: z.object({
          date: z.string().optional(),
          ogImage: z
            .object({
              title: z.string().optional(),
              description: z.string().optional(),
              cover: z.string().optional(),
              author: z
                .object({
                  name: z.string().optional(),
                  avatarUrl: z.string().optional(),
                  link: z.string().optional(),
                })
                .optional(),
            })
            .optional(),
        }),
      })
    ),
  },
});
