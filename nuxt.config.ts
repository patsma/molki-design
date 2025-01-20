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
          window.scrollTo(0, 0);
        }
      },
    },
  },
});
