// TypeScript declarations for HubSpot
declare global {
  interface Window {
    HubSpotConversations: {
      widget: {
        load: (config: { loadImmediately: boolean; inlineEmbedSelector: string }) => void;
        status: () => string;
        refresh: () => void;
        open: () => void;
        close: () => void;
        remove: () => void;
      };
      on: (event: string, callback: (payload?: any) => void) => void;
    };
  }
}

// Client-side only plugin for HubSpot
export default defineNuxtPlugin(() => {
  // Only run on client-side
  if (process.client) {
    const { cookiesEnabledIds } = useCookieControl();

    // Watch for cookie consent changes
    watch(
      cookiesEnabledIds,
      (enabledCookies) => {
        if (enabledCookies?.includes('chat')) {
          // Load HubSpot script only after cookie consent
          useHead({
            script: [
              {
                id: 'hs-script-loader',
                src: `//js-eu1.hs-scripts.com/144440300.js`,
                defer: true,
                async: true,
              },
            ],
          });
        }
      },
      { immediate: true }
    );
  }
});
