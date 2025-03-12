// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

declare module '@nuxt/schema' {
  interface NuxtConfig {
    gsap?: {
      composables?: boolean;
      extraPlugins?: Record<string, boolean>;
      clubPlugins?: Record<string, boolean>;
    };
    fonts?: {
      families: Array<{
        name: string;
        provider?: string;
        weights?: number[];
        styles?: string[];
        src?: Array<{
          path: string;
          weight: number;
          style: string;
          format: string;
        }>;
      }>;
    };
    content?: {
      documentDriven?: boolean;
      markdown?: {
        toc?: {
          depth?: number;
          searchDepth?: number;
        };
        anchorLinks?: boolean;
      };
      renderer?: {
        anchorLinks: boolean;
      };
      experimental?: {
        clientDB: boolean;
        stripQueryParameters: boolean;
        advancedEditing: boolean;
      };
      navigation?: {
        fields: string[];
      };
      preview?: {
        port?: number;
        host?: string;
        api?: string;
        dev?: boolean;
      };
      api?: {
        baseURL?: string;
      };
      studio?: {
        apiURL?: string;
      };
    };
    swiper?: {
      enableComposables?: boolean;
      bundled?: boolean;
    };
    cookieControl?: {
      barPosition?: string;
      closeModalOnClickOutside?: boolean;
      colors?: Record<string, string>;
      cookieExpiryOffsetMs?: number;
      cookieNameCookiesAccepted?: string;
      cookieNameCookiesEnabledIds?: string;
      cookies?: {
        necessary?: Array<Record<string, any>>;
        optional?: Array<Record<string, any>>;
      };
      isAcceptNecessaryButtonEnabled?: boolean;
      isControlButtonEnabled?: boolean;
      isModalForced?: boolean;
      locales?: Array<string>;
      locale?: string;
      isCookieIdVisible?: boolean;
      isTinyMCE?: boolean;
      privacyLink?: string;
      localeTexts?: Record<string, Record<string, string>>;
    };
  }
}

export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    '/': { prerender: true },
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

  modules: ['@nuxtjs/sitemap', '@hypernym/nuxt-gsap', '@pinia/nuxt', '@nuxt/fonts', '@vueuse/nuxt', '@nuxt/image', '@nuxt/icon', 'nuxt-swiper', '@nuxtjs/seo', '@nuxt/content', '@dargmuesli/nuxt-cookie-control', '@nuxtjs/tailwindcss'],

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
    privacyLink: '/polityka-prywatnosci',
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
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
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
        src: [
          {
            path: '/fonts/spartan/woff2/Spartan-Thin.woff2',
            weight: 100,
            style: 'normal',
            format: 'woff2',
          },
          {
            path: '/fonts/spartan/woff2/Spartan-ExtraLight.woff2',
            weight: 200,
            style: 'normal',
            format: 'woff2',
          },
          {
            path: '/fonts/spartan/woff2/Spartan-Light.woff2',
            weight: 300,
            style: 'normal',
            format: 'woff2',
          },
          {
            path: '/fonts/spartan/woff2/Spartan-Regular.woff2',
            weight: 400,
            style: 'normal',
            format: 'woff2',
          },
          {
            path: '/fonts/spartan/woff2/Spartan-Medium.woff2',
            weight: 500,
            style: 'normal',
            format: 'woff2',
          },
          {
            path: '/fonts/spartan/woff2/Spartan-SemiBold.woff2',
            weight: 600,
            style: 'normal',
            format: 'woff2',
          },
          {
            path: '/fonts/spartan/woff2/Spartan-Bold.woff2',
            weight: 700,
            style: 'normal',
            format: 'woff2',
          },
          {
            path: '/fonts/spartan/woff2/Spartan-ExtraBold.woff2',
            weight: 800,
            style: 'normal',
            format: 'woff2',
          },
          {
            path: '/fonts/spartan/woff2/Spartan-Black.woff2',
            weight: 900,
            style: 'normal',
            format: 'woff2',
          },
        ],
      },
    ],
  },

  content: {
    documentDriven: true,
    preview: {
      api: 'https://api.nuxt.studio',
      port: 3000,
      host: '0.0.0.0',
      dev: true,
    },
    renderer: {
      anchorLinks: false,
    },
    studio: {
      apiURL: 'https://api.nuxt.studio',
      experimental: {
        advancedEditing: true,
      },
    },
    api: {
      baseURL: '/api/_content',
    },
    experimental: {
      clientDB: true,
      stripQueryParameters: true,
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

  site: {
    url: 'https://molki-design-2025.netlify.app',
    name: 'Molki Design',
  },

  studio: {
    // Force cache invalidation on each page load
    devtools: {
      enabled: true,
    },
  },
});