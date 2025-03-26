// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },

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
      controlButtonBackground: '#b76246',
    },
    locales: ['pl'],
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
            'Te pliki cookie pomagają nam zrozumieć, w jaki sposób użytkownicy korzystają z naszej strony, co pozwala nam poprawić jej funkcjonalność. Obejmują one Google Analytics, Hotjar i Microsoft Clarity.',
          targetCookieIds: [
            '_ga',
            '_gid',
            '_gat',
            'ga-gtag',
            '_hjid',
            '_hjSessionUser',
            '_hjSession',
            '_hjAbsoluteSessionInProgress',
            '_clck',
            '_clsk',
          ],
        },
        {
          id: 'mkt',
          name: 'Marketing',
          description:
            'Te pliki cookie służą do śledzenia użytkowników w różnych witrynach w celu wyświetlania odpowiednich reklam i mierzenia ich skuteczności.',
          links: {
            '/polityka-prywatnosci': 'Polityka Prywatności',
          },
          targetCookieIds: ['_fbp', '_gcl_au', 'fr'],
        },
        {
          id: 'chat',
          name: 'Chat',
          description:
            'Umożliwia działanie czatu na stronie, dzięki któremu możesz się z nami skontaktować.',
          links: {
            'https://legal.hubspot.com/cookie-policy': 'HubSpot Cookie Policy',
          },
        },
      ],
    },
    localeTexts: {
      pl: {
        acceptAll: 'Akceptuj wszystkie',
        decline: 'Tylko niezbędne',
        manageCookies: 'Zarządzaj cookies',
        save: 'Zapisz',
        bannerDescription:
          'Używamy własnych plików cookie i plików cookie stron trzecich do analizy ruchu na stronie',
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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
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
    composables: true,

    // Extra plugins
    extraPlugins: {
      scrollTrigger: true,
      scrollTo: true,
    },

    // Club plugins (premium)
    clubPlugins: {
      splitText: true,
      drawSvg: true,
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

  plugins: ['~/plugins/analytics.client.ts', '~/plugins/hubspot.client.ts'],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/realizacje',
        '/blog',
        '/sitemap.xml',
        '/o-nas',
        '/kontakt',
        '/remont-pod-klucz',
        '/wnetrza-inwestycyjne',
      ],
      failOnError: false,
      ignore: [
        // Ignore dynamic route JSON payloads during prerender
        '/realizacje/**/_payload.json',
        '/blog/**/_payload.json',
      ],
    },
    routeRules: {
      '/': { prerender: true },
      '/realizacje': { prerender: true },
      '/blog': { prerender: true },
      '/realizacje/**': {
        prerender: true,
        index: false,
        swr: true, // Enable stale-while-revalidate for dynamic routes
      },
      '/blog/**': {
        prerender: true,
        index: false,
        swr: true, // Enable stale-while-revalidate for dynamic routes
      },
      '/**': {
        prerender: true,
        index: false,
      },
    },
  },

  site: {
    url: 'https://molki-design-2025.netlify.app',
    name: 'Molki Design',
    description: 'Profesjonalne projekty wnętrz w Trójmieście',
  },
  ogImage: {
    defaults: {
      component: 'Custom',
      props: {
        title: 'Molki Design',
        description: 'Profesjonalne projekty wnętrz w Trójmieście',
        cover: '/og-social-default.jpg',
      },
    },
    componentDirs: ['~/components/OgImage'],
    runtimeCacheStorage: true,
    cache: true,
    debug: process.env.NODE_ENV === 'development',
    host: 'https://molki-design-2025.netlify.app',
    compatibility: {
      prerender: {
        enabled: true,
        addScriptTag: true,
      },
    },
    injectMode: 'script',
  },

  runtimeConfig: {
    public: {
      hubspotPortalId: process.env.HUBSPOT_PORTAL_ID || '144440300', // Fallback for development
      isDev: process.env.NODE_ENV === 'development',
    },
  },
});
