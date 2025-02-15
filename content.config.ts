import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'document',
      source: {
        include: '**/*.md',
        exclude: ['**/.!(navigation.yml)'],
      },
      schema: z.object({
        title: z.string(),
        location: z.string(),
        year: z.string(), // Since we're using it as a string in our markdown
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
