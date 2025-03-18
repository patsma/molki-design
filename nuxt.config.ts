export default defineNuxtConfig({
  modules: ['nuxt-og-image', '@nuxt/content'],

  site: {
    url: 'https://nuxt-content-v3-og-image.netlify.app',
    name: 'Nuxt Content OG Image',
    description: 'The quickest and easiest way to build Open Graph images for Nuxt Content',
  },

  ogImage: {
    defaults: {
      component: 'Custom',
      props: {
        title: 'Nuxt Content OG Image',
        description: 'Dynamic Open Graph images for Nuxt Content',
        cover: '/alpine-0.png',
      },
    },
  },
  nitro: {
    trailingslash: false,
  },

  compatibilityDate: '2024-09-11',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      site: {
        name: 'Nuxt Content OG Image',
        description: 'The quickest and easiest way to build Open Graph images for Nuxt Content',
        url: 'https://nuxt-content-v3-og-image.netlify.app',
      },
    },
  },
});
