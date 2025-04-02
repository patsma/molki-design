import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import { asOgImageCollection } from 'nuxt-og-image/content';
import { asSitemapCollection } from '@nuxtjs/sitemap/content';

// Define common OG image schema
const ogImageSchema = z.object({
  component: z.string().optional(),
  props: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      cover: z.string().optional(),
    })
    .optional(),
});

// Define media picker schema for images
const mediaPickerSchema = z.string().refine(
  (value) => {
    // Validate that the value is a string and starts with a forward slash
    // This ensures it's a valid path from the public directory
    return typeof value === 'string' && value.startsWith('/');
  },
  {
    message: 'Image path must be a valid path from the public directory',
  }
);

export default defineContentConfig({
  collections: {
    projects: defineCollection(
      asSitemapCollection(
        asOgImageCollection({
          type: 'document',
          source: 'projects/*.md',
          schema: z.object({
            title: z.string(),
            subtitle: z.string(),
            slug: z.string(),
            location: z.string(),
            year: z.string(),
            number: z.string(),
            cover: mediaPickerSchema,
            images: z.array(mediaPickerSchema),
            ctaText: z.string().optional(),
            ctaLink: z.string().optional(),
            seo: z
              .object({
                title: z.string().optional(),
                description: z.string().optional(),
              })
              .optional(),
            ogImage: ogImageSchema.optional(),
          }),
        })
      )
    ),
    blog: defineCollection(
      asSitemapCollection(
        asOgImageCollection({
          type: 'document',
          source: 'blog/*.md',
          schema: z.object({
            title: z.string(),
            slug: z.string(),
            category: z.string(),
            date: z.string(),
            cover: mediaPickerSchema,
            excerpt: z.string(),
            author: z.string().optional(),
            authorRole: z.string().optional(),
            authorImage: mediaPickerSchema.optional(),
            seo: z
              .object({
                title: z.string().optional(),
                description: z.string().optional(),
              })
              .optional(),
            ogImage: ogImageSchema.optional(),
          }),
        })
      )
    ),
    content: defineCollection(
      asSitemapCollection(
        asOgImageCollection({
          type: 'page',
          source: '**/*.md',
          schema: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            seo: z
              .object({
                title: z.string().optional(),
                description: z.string().optional(),
              })
              .optional(),
            ogImage: ogImageSchema.optional(),
          }),
        })
      )
    ),
  },
});
