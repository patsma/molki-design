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
    };
  }
}

export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    '/': { prerender: true },
  },
  typescript: {
    strict: true,
    typeCheck: false,
    shim: false,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@hypernym/nuxt-gsap',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/icon',
    'nuxt-swiper',
  ],

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
    preview: {
      api: 'https://api.nuxt.studio',
    },
    documentDriven: true,
    renderer: {
      anchorLinks: false,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2025-01-29',

  swiper: {
    // Swiper options
    prefix: 'Swiper',
    styleLang: 'css',
    modules: ['navigation', 'pagination', 'autoplay'],
  },

  plugins: ['~/plugins/hubspot.client.ts'],

  nitro: {
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
      hubspotPortalId: process.env.HUBSPOT_PORTAL_ID,
      isDev: process.env.NODE_ENV !== 'production',
    },
  },
});
