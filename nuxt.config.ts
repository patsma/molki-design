// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    '/**': { prerender: true }, // Prerender all routes
  },
  typescript: {
    typeCheck: false,
    shim: false,
  },

  modules: [
    '@nuxtjs/sitemap',
    '@hypernym/nuxt-gsap',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    'nuxt-swiper',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@dargmuesli/nuxt-cookie-control',
    '@nuxtjs/tailwindcss',
    'nuxt-og-image',
    'nuxt-schema-org',
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  icon: {
    customCollections: [
      {
        prefix: 'fig',
        dir: './assets/icons/figma',
      },
    ],
  },
  gsap: {
    // Enable composables
    composables: true,

    // Extra plugins
    extraPlugins: {
      scrollTrigger: true,
      // Note: ScrollSmoother is not an official extra plugin
      // We'll need to handle it differently
    },

    // Club plugins (premium)
    clubPlugins: {
      morphSvg: true, // Note the lowercase 'svg'
      splitText: true,
      scrollSmoother: true, // Add ScrollSmoother as a club plugin
      drawSvg: true, // Add DrawSVG plugin for SVG path animations (lowercase 'svg')
    },
  },

  fonts: {
    families: [
      {
        name: 'Montserrat',
        provider: 'google',
        weights: [300, 400, 500, 600, 700],
        styles: ['normal', 'italic'],
      },
      {
        name: 'Spartan',
        provider: 'none',
      },
    ],
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },

  compatibilityDate: '2025-01-29',

  nitro: {
    trailingslash: false,
  },

  site: {
    url: 'https://molki-design-2025.netlify.app',
    name: 'Molki Design',
    description: 'Profesjonalne projekty wnętrz w Trójmieście',
    image: '/og-social-default.jpg',
  },

  ogImage: {
    componentDirs: ['components/OgImage'],
    defaults: {
      component: 'Custom',
      props: {
        title: 'Molki Design',
        description: 'Profesjonalne projekty wnętrz w Trójmieście',
        cover: '/og-social-default.jpg',
      },
    },
  },
});
