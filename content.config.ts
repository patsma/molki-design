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
        slug: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        location: z.string(),
        year: z.string(),
        number: z.string(),
        cover: z.string(),
        description: z.string(),
        images: z.array(z.string()).optional(),
        ctaText: z.string().default('ZOBACZ WIĘCEJ'),
      }),
    }),
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
  },
});
