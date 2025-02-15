import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'document',
      source: {
        include: 'projects/*.md',
        exclude: ['**/.!(navigation.yml)'],
      },
      schema: z.object({
        slug: z.string().optional(),
        title: z.string(),
        location: z.string(),
        year: z.string(),
        number: z.string(),
        cover: z.string(),
      }),
    }),
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
  },
});
