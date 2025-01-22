// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@hypernym/nuxt-gsap", "@pinia/nuxt"],
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
      onBeforeEnter: () => {
        if (process.client) {
          // window.scrollTo(0, 0);
        }
      },
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
  router: {
    middleware: ["scroll-effects"],
  },
});
