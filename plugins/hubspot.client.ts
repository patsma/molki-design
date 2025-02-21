// Client-side only plugin for HubSpot
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Only run on client-side
  if (process.client) {
    useHead({
      script: [
        {
          id: 'hs-script-loader',
          src: `//js-eu1.hs-scripts.com/${config.public.hubspotPortalId}.js`,
          defer: true,
          async: true,
        },
      ],
    });
  }
});
