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

// Add plugin type declarations
declare module '#app' {
  interface NuxtApp {
    $hubspot: {
      init: () => void;
      open: () => void;
      close: () => void;
      remove: () => void;
      isInitialized: Ref<boolean>;
      isLoaded: Ref<boolean>;
      isVisible: Ref<boolean>;
    };
  }
}

// Client-side only plugin for HubSpot
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const isInitialized = ref(false);
  const isLoaded = ref(false);
  const isVisible = ref(false);

  // Only run on client-side
  if (process.client) {
    const { cookiesEnabledIds } = useCookieControl();

    // Watch for cookie consent changes
    watch(
      cookiesEnabledIds,
      (enabledCookies) => {
        if (enabledCookies?.includes('chat')) {
          if (!config.public.hubspotPortalId) {
            console.error('HubSpot portal ID is not configured');
            return;
          }

          useHead({
            script: [
              {
                id: 'hs-script-loader',
                src: `//js-eu1.hs-scripts.com/${config.public.hubspotPortalId}.js`,
                defer: true,
                async: true,
                onload: () => {
                  isLoaded.value = true;
                },
              },
            ],
          });
        }
      },
      { immediate: true }
    );
  }

  return {
    provide: {
      hubspot: {
        init: () => {
          if (!process.client || !window.HubSpotConversations) return;
          window.HubSpotConversations.widget.load({
            loadImmediately: true,
            inlineEmbedSelector: '',
          });
          isInitialized.value = true;
        },
        open: () => {
          if (!process.client || !window.HubSpotConversations) return;
          window.HubSpotConversations.widget.open();
          isVisible.value = true;
        },
        close: () => {
          if (!process.client || !window.HubSpotConversations) return;
          window.HubSpotConversations.widget.close();
          isVisible.value = false;
        },
        remove: () => {
          if (!process.client || !window.HubSpotConversations) return;
          window.HubSpotConversations.widget.remove();
          isInitialized.value = false;
          isVisible.value = false;
        },
        isInitialized,
        isLoaded,
        isVisible,
      },
    },
  };
});
