export default defineNuxtPlugin(() => {
  const gtagId = 'G-242W7FGX6K';
  const { cookiesEnabledIds, isConsentGiven } = useCookieControl();

  // Function to initialize Google Analytics
  const initializeGA = () => {
    // Remove any previous GA scripts to avoid duplicates
    const existingScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
    existingScripts.forEach((script) => script.remove());

    // Create and add the GA script
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore - gtag accepts variable arguments
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gtagId);

    // Add to window for TypeScript compatibility
    window.gtag = gtag;
  };

  // Function to check if analytics is enabled
  const checkAnalyticsEnabled = (enabledCookies: string[] | null | undefined) => {
    // Only initialize GA if analytics cookies are accepted
    if (enabledCookies?.includes('ana')) {
      initializeGA();
    } else {
      // Remove GA scripts if analytics cookies are not accepted
      const existingScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
      existingScripts.forEach((script) => script.remove());

      // Clear any existing dataLayer
      if (window.dataLayer) {
        window.dataLayer = [];
      }
    }
  };

  // Watch for changes in cookie consent
  watch(
    cookiesEnabledIds,
    (enabledCookies) => {
      checkAnalyticsEnabled(enabledCookies);
    },
    { immediate: true }
  );

  // Handle initial state when consent is already given
  if (isConsentGiven && cookiesEnabledIds.value?.includes('ana')) {
    checkAnalyticsEnabled(cookiesEnabledIds.value);
  }
});

// Add TypeScript global declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
