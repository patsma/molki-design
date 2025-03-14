export default defineNuxtPlugin(() => {
  const gtagId = 'G-242W7FGX6K';

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
        async: true,
      },
      {
        innerHTML: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}');`,
      },
    ],
  });
});
