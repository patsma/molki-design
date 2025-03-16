<script setup>
import { useSeoMeta, useHead } from '#imports';

// Structured data for local business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesignService',
  name: 'Molki Design',
  description:
    'W Molki Design tworzymy przemyślane, ponadczasowe wnętrza, które łączą w sobie piękno i wygodę.',
  url: 'https://molki-design-2025.netlify.app',
  telephone: '+48 572 323 207',
  email: 'kontakt@molki.pl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ul. Heweliusza 11/811',
    addressLocality: 'Gdańsk',
    postalCode: '80-890',
    addressCountry: 'PL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '54.3520',
    longitude: '18.6466',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  sameAs: ['https://www.molkidesign.pl'],
  priceRange: '$$',
  image: '/og-image.jpg',
  founder: {
    '@type': 'Person',
    name: 'Wioletta Retko',
    jobTitle: 'Projektantka Wnętrz',
  },
};

// Default SEO configuration using useSeoMeta
useSeoMeta({
  // Basic meta tags
  title: 'Molki Design - Projektowanie i Remont Wnętrz',
  description:
    'W Molki Design tworzymy przemyślane, ponadczasowe wnętrza, które łączą w sobie piękno i wygodę. Oferujemy kompleksowe projekty wnętrz, remonty pod klucz oraz profesjonalne porady projektowe.',

  // Open Graph meta tags for better social sharing
  ogTitle: 'Molki Design - Projektowanie i Remont Wnętrz',
  ogDescription:
    'W Molki Design tworzymy przemyślane, ponadczasowe wnętrza, które łączą w sobie piękno i wygodę. Oferujemy kompleksowe projekty wnętrz, remonty pod klucz oraz profesjonalne porady projektowe.',
  ogImage: 'https://molki-design-2025.netlify.app/og-image.jpg',
  ogImageAlt: 'Molki Design - Wnętrza z charakterem',
  ogUrl: 'https://molki-design-2025.netlify.app', // Current domain
  ogType: 'website',
  ogSiteName: 'Molki Design',
  ogLocale: 'pl_PL',

  // Twitter card meta tags
  twitterCard: 'summary_large_image',
  twitterTitle: 'Molki Design - Projektowanie i Remont Wnętrz',
  twitterDescription:
    'W Molki Design tworzymy przemyślane, ponadczasowe wnętrza, które łączą w sobie piękno i wygodę. Oferujemy kompleksowe projekty wnętrz, remonty pod klucz oraz profesjonalne porady projektowe.',
  twitterImage: 'https://molki-design-2025.netlify.app/og-image.jpg',
  twitterImageAlt: 'Molki Design - Wnętrza z charakterem',

  // Additional meta tags
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
  robots: 'index, follow',
  themeColor: '#ffffff',
  author: 'Wioletta Retko - Molki Design',

  // Additional business information
  address: 'ul. Heweliusza 11/811, 80-890 Gdańsk',
  telephone: '+48 572 323 207',
  email: 'kontakt@molki.pl',

  // Keywords for better SEO
  keywords:
    'projektowanie wnętrz, remont pod klucz, porada projektowa, home staging, projekt mieszkania, projekt domu, projekt biura, wizualizacje wnętrz, Gdańsk, aranżacja wnętrz, projektant wnętrz Gdańsk',
});

// Add title template for consistent page titles across the site
useHead({
  titleTemplate: (pageTitle) => {
    return pageTitle
      ? `${pageTitle} | Molki Design`
      : 'Molki Design - Projektowanie i Remont Wnętrz';
  },

  // Add link tags for better SEO and functionality
  link: [
    { rel: 'canonical', href: 'https://molki-design-2025.netlify.app' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],

  // Add language tag
  htmlAttrs: {
    lang: 'pl',
  },

  // Add structured data
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(jsonLd),
    },
  ],
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<!--suppress CssUnknownTarget -->
<style lang="scss">
@use '~/assets/scss/main.scss';
</style>
