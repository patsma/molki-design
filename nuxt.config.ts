// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

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
    strict: true,
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
  ],

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
          targetCookieIds: ['_ga', '_gid', '_gat'],
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
        bannerDescription:
          'Używamy plików cookie, aby zapewnić najlepsze wrażenia na naszej stronie. Możesz dowiedzieć się więcej o tym, jakich plików cookie używamy, lub wyłączyć je w ustawieniach.',
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
      title: 'Molki Design',
      meta: [
        {
          name: 'description',
          content:
            'Od 2019 roku Molki Design, z siedzibą w Gdańsku, działa na rynku trójmiejskim, oferując kreatywne rozwiązania, które przekraczają oczekiwania. Nasz zespół to grupa pasjonatów, którzy wzajemnie się uzupełniają, by dostarczać projekty, z których możemy być dumni.',
        },
        // Theme color meta tag for mobile browsers
        { name: 'theme-color', content: '#ffffff' },
        // Windows tile color
        { name: 'msapplication-TileColor', content: '#ffffff' },
      ],
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
      // Use a simpler configuration for Spartan font
      {
        name: 'Spartan',
        provider: 'none', // Don't use any provider, we'll handle it manually
      },
    ],
  },

  content: {
    // Only include the preview property which is likely supported in Nuxt Content v3
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },

  compatibilityDate: '2025-01-29',

  // Fix the swiper configuration
  swiper: {
    enableComposables: true,
    bundled: true,
  },

  plugins: ['~/plugins/hubspot.client.ts'],

  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ['/api', '/studio'],
      routes: ['/', '/todo'],
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
          ].join(' '),
        },
      },
    },
  },

  // Add runtimeConfig
  runtimeConfig: {
    public: {
      hubspotPortalId: process.env.HUBSPOT_PORTAL_ID || '', // Provide empty string as fallback
      isDev: process.env.NODE_ENV !== 'production',
    },
  },

  // Enhanced site configuration for SEO
  site: {
    url: 'https://molki-design-2025.netlify.app',
    name: 'Molki Design',
    description: 'Projekty wnętrz i porady projektowe | Gdańsk, Sopot, Gdynia, Trójmiasto, Polska',
    defaultLocale: 'pl',
    image: '/og-image.jpg',
  },
});
