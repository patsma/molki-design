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

// Define media picker schema for images - using simple string pattern instead of refine
const mediaPickerSchema = z.string().startsWith('/');

export default defineContentConfig({
  collections: {
    projects: defineCollection(
      asSitemapCollection(
        asOgImageCollection({
          type: 'data',
          source: 'projects/*.md',
          schema: z.object({
            // Basic Project Information
            title: z.string().describe('Tytuł projektu'),
            subtitle: z.string().describe('Podtytuł projektu'),
            slug: z
              .string()
              .describe('URL-friendly nazwa projektu (np. projekt-wnetrza-mieszkania)'),
            location: z.string().describe('Lokalizacja projektu (np. Gdańsk)'),
            year: z.string().describe('Rok realizacji'),
            number: z.string().describe('Numer projektu (np. 01)'),

            // Project Images
            cover: mediaPickerSchema.describe(
              'Główne zdjęcie projektu (wyświetlane na liście projektów)'
            ),
            images: z
              .array(mediaPickerSchema)
              .describe('Galeria zdjęć projektu - wybierz wszystkie zdjęcia dla slidera'),

            // Call to Action
            ctaText: z
              .string()
              .optional()
              .describe('Tekst przycisku CTA (domyślnie: ZOBACZ WIĘCEJ)'),
            ctaLink: z.string().optional().describe('Link do przycisku CTA (opcjonalnie)'),

            // SEO Settings
            seo: z
              .object({
                title: z
                  .string()
                  .optional()
                  .describe('Własny tytuł SEO (zostaw puste aby użyć domyślnego)'),
                description: z
                  .string()
                  .optional()
                  .describe('Własny opis SEO (zostaw puste aby użyć domyślnego)'),
              })
              .optional()
              .describe('Ustawienia SEO'),

            // OG Image Settings
            ogImage: ogImageSchema.optional().describe('Ustawienia obrazu dla social media'),
          }),
        })
      )
    ),
    blog: defineCollection(
      asSitemapCollection(
        asOgImageCollection({
          type: 'data',
          source: 'blog/*.md',
          schema: z.object({
            title: z.string().describe('Tytuł wpisu'),
            slug: z.string().describe('URL-friendly nazwa wpisu'),
            category: z.string().describe('Kategoria wpisu'),
            date: z.string().describe('Data publikacji'),
            cover: mediaPickerSchema.describe('Główne zdjęcie wpisu'),
            excerpt: z.string().describe('Krótki opis wpisu'),
            author: z.string().optional().describe('Autor wpisu'),
            authorRole: z.string().optional().describe('Stanowisko autora'),
            authorImage: mediaPickerSchema.optional().describe('Zdjęcie autora'),
            seo: z
              .object({
                title: z
                  .string()
                  .optional()
                  .describe('Własny tytuł SEO (zostaw puste aby użyć domyślnego)'),
                description: z
                  .string()
                  .optional()
                  .describe('Własny opis SEO (zostaw puste aby użyć domyślnego)'),
              })
              .optional()
              .describe('Ustawienia SEO'),
            ogImage: ogImageSchema.optional().describe('Ustawienia obrazu dla social media'),
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
            title: z.string().optional().describe('Tytuł strony'),
            description: z.string().optional().describe('Opis strony'),
            seo: z
              .object({
                title: z.string().optional().describe('Własny tytuł SEO'),
                description: z.string().optional().describe('Własny opis SEO'),
              })
              .optional()
              .describe('Ustawienia SEO'),
            ogImage: ogImageSchema.optional().describe('Ustawienia obrazu dla social media'),
          }),
        })
      )
    ),
  },
});
