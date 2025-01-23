// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@hypernym/nuxt-gsap",
    "@pinia/nuxt",
    "@nuxt/fonts",
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
            url: "http://fonts.gstatic.com/s/spartan/v3/l7gAbjR61M69yt8Z8w6FZf9WoBxdBrGFuG6OChXtf4qS.ttf",
            weight: 100,
            style: "normal",
          },
          {
            url: "http://fonts.gstatic.com/s/spartan/v3/l7gAbjR61M69yt8Z8w6FZf9WoBxdBrEFuW6OChXtf4qS.ttf",
            weight: 200,
            style: "normal",
          },
          {
            url: "http://fonts.gstatic.com/s/spartan/v3/l7gAbjR61M69yt8Z8w6FZf9WoBxdBrHbuW6OChXtf4qS.ttf",
            weight: 300,
            style: "normal",
          },
          {
            url: "http://fonts.gstatic.com/s/spartan/v3/l7gAbjR61M69yt8Z8w6FZf9WoBxdBrGFuW6OChXtf4qS.ttf",
            weight: 400,
            style: "normal",
          },
          {
            url: "http://fonts.gstatic.com/s/spartan/v3/l7gAbjR61M69yt8Z8w6FZf9WoBxdBrG3uW6OChXtf4qS.ttf",
            weight: 500,
            style: "normal",
          },
          {
            url: "http://fonts.gstatic.com/s/spartan/v3/l7gAbjR61M69yt8Z8w6FZf9WoBxdBrCZuW6OChXtf4qS.ttf",
            weight: 600,
            style: "normal",
          },
          {
            url: "http://fonts.gstatic.com/s/spartan/v3/l7gAbjR61M69yt8Z8w6FZf9WoBxdBrFZuW6OChXtf4qS.ttf",
            weight: 700,
            style: "normal",
          },
          {
            url: "http://fonts.gstatic.com/s/spartan/v3/l7gAbjR61M69yt8Z8w6FZf9WoBxdBrEZuW6OChXtf4qS.ttf",
            weight: 800,
            style: "normal",
          },
          {
            url: "http://fonts.gstatic.com/s/spartan/v3/l7gAbjR61M69yt8Z8w6FZf9WoBxdBrEiuW6OChXtf4qS.ttf",
            weight: 900,
            style: "normal",
          }
        ]
      }
    ],
  },
});
