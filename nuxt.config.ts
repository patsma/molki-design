// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

// Determine environment
const isDev = process.env.NODE_ENV !== 'production';

// Define the primary site URL with environment awareness
const SITE_URL =
  process.env.NUXT_SITE_URL ||
  (isDev ? 'http://localhost:3000' : 'https://molki-design-2025.netlify.app');

// Site environment - important for robots.txt generation
const SITE_ENV = process.env.NUXT_SITE_ENV || (isDev ? 'development' : 'production');

export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    '/': { prerender: true },
    '/projects': { redirect: '/realizacje' },
    '/projects/**': { redirect: '/realizacje/**' },
    '/**': {
      prerender: true,
      index: false,
    },
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

  ogImage: {
    defaults: {
      component: 'Custom',
      width: 1200,
      height: 630,
      // Define props that will be used as default values
      props: {
        title: 'Molki Design',
        description: 'Profesjonalne projekty wnętrz w Trójmieście',
        cover: '/og-social-default.jpg',
      },
    },
    // Enable static image rendering for faster sharing
    runtimeCacheStorage: true,
  },
  // Cookie control configuration
  cookieControl: {
    barPosition: 'bottom-full',
    closeModalOnClickOutside: true,
    colors: {
      barBackground: '#ffffff',
      barButtonBackground: '#b76246',
      barButtonColor: '#ffffff',
      barButtonHoverBackground: '#a65339',
      barTextColor: '#503d32',
      modalBackground: '#f9f5f2',
      modalButtonBackground: '#b76246',
      modalButtonColor: '#ffffff',
      modalButtonHoverBackground: '#a65339',
      modalTextColor: '#503d32',
      checkboxActiveBackground: '#b76246',
      checkboxInactiveBackground: '#e6e4df',
      checkboxActiveCircleBackground: '#ffffff',
      checkboxInactiveCircleBackground: '#ffffff',
      checkboxDisabledBackground: '#d9d9d9',
      controlButtonBackground: '#b76246',
    },
    cookies: {
      necessary: [
        {
          id: 'nec',
          name: 'Niezbędne pliki cookie',
          description:
            'Te pliki cookie są niezbędne do prawidłowego funkcjonowania naszej strony internetowej i nie można ich wyłączyć.',
          targetCookieIds: ['ncc_c', 'ncc_e'],
        },
      ],
      optional: [
        {
          id: 'ana',
          name: 'Analityka',
          description:
            'Te pliki cookie pomagają nam zrozumieć, w jaki sposób użytkownicy korzystają z naszej strony, co pozwala nam poprawić jej funkcjonalność.',
          targetCookieIds: ['_ga', '_gid', '_gat', 'ga-gtag'],
          src: 'https://www.googletagmanager.com/gtag/js?id=G-242W7FGX6K',
        },
        {
          id: 'mkt',
          name: 'Marketing',
          description:
            'Te pliki cookie służą do śledzenia użytkowników w różnych witrynach w celu wyświetlania odpowiednich reklam.',
          links: {
            '/polityka-prywatnosci': 'Polityka Prywatności',
          },
          targetCookieIds: ['_fbp', '_gcl_au'],
        },
      ],
    },
    locales: ['pl'],
    localeTexts: {
      pl: {
        bannerTitle: 'Pliki cookie',
        acceptAll: 'Akceptuj wszystkie',
        decline: 'Tylko niezbędne',
        manageCookies: 'Zarządzaj cookies',
        save: 'Zapisz',
      },
    },
    isControlButtonEnabled: false,
    isCookieIdVisible: true,
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  app: {
    head: {
      link: [
        // SVG favicon - primary choice for modern browsers
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },

        // ICO favicon - for legacy browsers
        { rel: 'icon', href: '/favicon.ico' },

        // PNG fallback favicons for better compatibility
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },

        // Apple Touch Icon for iOS devices
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },

        // Web App Manifest
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
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
  swiper: {
    enableComposables: true,
    bundled: true,
  },

  plugins: ['~/plugins/hubspot.client.ts', '~/plugins/google-analytics.client.ts'],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/realizacje', '/blog', '/sitemap.xml'],
    },
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': [
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            '*.hs-scripts.com',
            '*.hubspot.com',
            '*.hscollectedforms.net',
            '*.usemessages.com',
            '*.hs-analytics.net',
            '*.hs-banner.com',
            '*.hsforms.net',
            'js-eu1.hs-scripts.com',
            'js-eu1.hscollectedforms.net',
            'js-eu1.usemessages.com',
            'js-eu1.hs-analytics.net',
            'js-eu1.hs-banner.com',
            'js-eu1.hsforms.net',
            '*.googletagmanager.com',
            '*.google-analytics.com',
          ].join(' '),
        },
      },
    },
  },

  // Enhanced site configuration for SEO with environment awareness
  site: {
    url: SITE_URL,
    name: 'Molki Design',
    description:
      'Profesjonalne projekty wnętrz w Trójmieście. Kompleksowe usługi projektowania domów, mieszkań i przestrzeni komercyjnych. Sprawdź nasze realizacje!',
    defaultLocale: 'pl',
    indexable: SITE_ENV === 'production', // Only index in production
    env: SITE_ENV, // Add environment explicitly
    image: '/og-social-default.jpg',
    titleSeparator: ' | ',
    trailingSlash: false,
    twitter: '@MolkiDesign',
    facebook: true,
    facebookPage: 'MolkiDesign',
  },

  // Update runtime config with environment awareness
  runtimeConfig: {
    public: {
      hubspotPortalId: process.env.HUBSPOT_PORTAL_ID || '',
      isDev: isDev,
      siteUrl: SITE_URL,
      siteEnv: SITE_ENV,
    },
  },
});
