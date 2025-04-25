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
const mediaPickerSchema = z.object({
  src: z.string().startsWith('/').editor({ input: 'media' }),
  alt: z
    .string()
    .min(1, 'Tekst alternatywny jest wymagany')
    .describe('Tekst alternatywny dla obrazu'),
});

// Define slider schema
const sliderSchema = z.object({
  images: z
    .array(mediaPickerSchema)
    .describe(
      'Wybierz zdjęcia, które mają się pojawiać w sliderze (zalecane wymiary: 1920x1080px)'
    ),
  ctaText: z
    .string()
    .optional()
    .describe('Wprowadź tekst, który ma się pojawić na przycisku (domyślnie: UMÓW KONSULTACJĘ)'),
  ctaLink: z.string().optional().describe('Wprowadź URL, do którego ma prowadzić przycisk'),
});

export default defineContentConfig({
  collections: {
    realizacje: defineCollection(
      asSitemapCollection(
        asOgImageCollection({
          type: 'data',
          source: 'realizacje/*.md',
          schema: z.object({
            // Basic Project Information
            title: z.string().describe('Tytuł realizacji'),
            subtitle: z.string().describe('Podtytuł realizacji'),
            slug: z
              .string()
              .describe('URL-friendly nazwa realizacji (np. projekt-wnetrza-mieszkania)'),
            location: z.string().describe('Lokalizacja realizacji (np. Gdańsk)'),
            year: z.string().describe('Rok realizacji'),
            number: z.string().describe('Numer realizacji (np. 01)'),
            metraz: z.number().describe('Metraż w metrach kwadratowych'),

            // Project Images
            cover: mediaPickerSchema.describe(
              'Główne zdjęcie realizacji (wyświetlane na liście realizacji) (zalecane wymiary: 1920x1080px)'
            ),
            slider: z
              .object({
                images: z
                  .array(mediaPickerSchema)
                  .min(1, 'Wymagane jest przynajmniej jedno zdjęcie')
                  .describe(
                    'Wybierz zdjęcia, które mają się pojawiać w sliderze (zalecane wymiary: 1920x1080px)'
                  ),
              })
              .optional()
              .describe('Ustawienia slidera realizacji'),

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
            cover: mediaPickerSchema.describe(
              'Główne zdjęcie projektu (wyświetlane na liście projektów) (zalecane wymiary: 1920x1080px)'
            ),
            excerpt: z.string().describe('Krótki opis wpisu'),
            author: z.string().optional().describe('Autor wpisu'),
            authorRole: z.string().optional().describe('Stanowisko autora'),
            authorImage: mediaPickerSchema.describe('Zdjęcie autora'),
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
    publikacje: defineCollection(
      asSitemapCollection(
        asOgImageCollection({
          type: 'data',
          source: 'publikacje/*.md',
          schema: z.object({
            title: z.string().describe('Tytuł publikacji'),
            slug: z.string().describe('URL-friendly nazwa publikacji'),
            date: z.string().describe('Data publikacji'),
            cover: mediaPickerSchema.describe(
              'Zdjęcie okładki publikacji (zalecane wymiary: 1920x1080px)'
            ),
            pdfUrl: z
              .string()
              .startsWith('/')
              .describe('Ścieżka do pliku PDF (np. /pdf/nazwa-pliku.pdf)'),
            description: z.string().optional().describe('Krótki opis publikacji'),
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
            // Basic Page Information
            headerSpacing: z.boolean().optional().describe('Czy strona ma mieć odstęp od nagłówka'),
            title: z.string().describe('Tytuł strony'),
            description: z.string().describe('Opis strony'),

            // SEO Settings
            seo: z
              .object({
                title: z.string().describe('Własny tytuł SEO'),
                description: z.string().describe('Własny opis SEO'),
              })
              .describe('Ustawienia SEO'),

            // OG Image Settings
            ogImage: z
              .object({
                component: z.string(),
                props: z.object({
                  title: z.string(),
                  description: z.string(),
                  cover: z.string().startsWith('/'),
                }),
              })
              .describe('Ustawienia obrazu dla social media'),

            // Full Viewport Slider (if needed)
            fullViewportSlider: sliderSchema
              .optional()
              .describe('Ustawienia slidera na pełną wysokość ekranu'),
          }),
        })
      )
    ),
    appConfig: defineCollection({
      type: 'data',
      source: 'nuxt.schema.ts',
      schema: z
        .object({
          contactInfo: z
            .object({
              email: z.string().optional(),
              phone: z.string().optional(),
              companyInfo: z.string().optional(),
              officeInfo: z.string().optional(),
              socialLinks: z
                .object({
                  instagram: z.string().optional(),
                  facebook: z.string().optional(),
                  linkedin: z.string().optional(),
                })
                .optional(),
            })
            .optional(),
          companies: z
            .object({
              wlasciwyKurs: z
                .object({
                  url: z.string().optional(),
                  title: z.string().optional(),
                  subtitle: z.string().optional(),
                  description: z.string().optional(),
                })
                .optional(),
              molkiInvest: z
                .object({
                  url: z.string().optional(),
                  title: z.string().optional(),
                  subtitle: z.string().optional(),
                  description: z.string().optional(),
                })
                .optional(),
            })
            .optional(),
          studio: z
            .object({
              title: z.string().optional(),
            })
            .optional(),
        })
        .passthrough(),
    }),
  },
});
