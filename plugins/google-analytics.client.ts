export default defineNuxtPlugin(() => {
  const gtagId = 'G-242W7FGX6K';
  const { cookiesEnabledIds } = useCookieControl();

  watch(
    cookiesEnabledIds,
    (enabledCookies) => {
      // Check if enabledCookies exists and is an array
      if (enabledCookies?.includes('ana')) {
        // Initialize GA only when analytics cookies are accepted
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
      }
    },
    { immediate: true }
  );
});
