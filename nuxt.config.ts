// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@hypernym/nuxt-gsap",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@vueuse/nuxt",
  ],
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
  fonts: {
    families: [
      {
        name: "Montserrat",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
        styles: ["normal", "italic"],
      },
      {
        name: "Spartan",
        provider: "none",
        src: [
          {
            path: "/fonts/spartan/woff2/Spartan-Thin.woff2",
            weight: 100,
            style: "normal",
            format: "woff2",
          },
          {
            path: "/fonts/spartan/woff2/Spartan-ExtraLight.woff2",
            weight: 200,
            style: "normal",
            format: "woff2",
          },
          {
            path: "/fonts/spartan/woff2/Spartan-Light.woff2",
            weight: 300,
            style: "normal",
            format: "woff2",
          },
          {
            path: "/fonts/spartan/woff2/Spartan-Regular.woff2",
            weight: 400,
            style: "normal",
            format: "woff2",
          },
          {
            path: "/fonts/spartan/woff2/Spartan-Medium.woff2",
            weight: 500,
            style: "normal",
            format: "woff2",
          },
          {
            path: "/fonts/spartan/woff2/Spartan-SemiBold.woff2",
            weight: 600,
            style: "normal",
            format: "woff2",
          },
          {
            path: "/fonts/spartan/woff2/Spartan-Bold.woff2",
            weight: 700,
            style: "normal",
            format: "woff2",
          },
          {
            path: "/fonts/spartan/woff2/Spartan-ExtraBold.woff2",
            weight: 800,
            style: "normal",
            format: "woff2",
          },
          {
            path: "/fonts/spartan/woff2/Spartan-Black.woff2",
            weight: 900,
            style: "normal",
            format: "woff2",
          },
        ],
      },
    ],
  },
});