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
  const config = useRuntimeConfig();
  const isInitialized = ref(false);
  const isLoaded = ref(false);
  const isVisible = ref(false);

  // Only run on client-side
  if (process.client) {
    // Debug info for initialization
    const debugHubspot = () => {
      if (window.HubSpotConversations) {
        const status = window.HubSpotConversations.widget.status();
        if (!status) {
          console.warn('HubSpot Conversations not initialized');
        }
      }
    };

    // Load the HubSpot script but don't initialize widget automatically
    useHead({
      script: [
        {
          id: 'hs-script-loader',
          src: `//js-eu1.hs-scripts.com/144440300.js`,
          defer: true,
          async: true,
          onload: () => debugHubspot(),
          onerror: (error) => {
            console.error('❌ Failed to load HubSpot script:', error);
          },
        },
      ],
    });
  }

  // Initialize widget with configuration - defined outside the if(process.client) block
  // so it can be referenced in provide methods
  const initWidget = () => {
    if (!process.client) return;

    if (window.HubSpotConversations && !isInitialized.value) {
      try {
        // Configure the widget with its native UI
        window.HubSpotConversations.widget.load({
          loadImmediately: true, // Change to true to show the built-in button
          inlineEmbedSelector: '#hubspot-messages-iframe-container',
        });

        // Set up event listeners
        window.HubSpotConversations.on('hsConversationsLoaded', () => {
          isLoaded.value = true;
        });

        window.HubSpotConversations.on('widgetOpen', () => {
          isVisible.value = true;
        });

        window.HubSpotConversations.on('widgetClose', () => {
          isVisible.value = false;
        });

        isInitialized.value = true;
      } catch (error) {
        console.error('❌ Error initializing HubSpot widget:', error);
      }
    }
  };

  // Provide methods to control the widget
  return {
    provide: {
      hubspot: {
        // Initialize the widget
        init: () => {
          if (process.client && !isInitialized.value) {
            if (typeof window !== 'undefined' && window.HubSpotConversations) {
              initWidget();
            } else {
              // If HubSpot script is not loaded yet, try again after a delay
              const checkInterval = setInterval(() => {
                if (typeof window !== 'undefined' && window.HubSpotConversations) {
                  clearInterval(checkInterval);
                  initWidget();
                }
              }, 500);

              // Clear interval after 10 seconds to prevent infinite attempts
              setTimeout(() => clearInterval(checkInterval), 10000);
            }
          }
        },
        // Open the chat widget
        open: () => {
          if (process.client && window.HubSpotConversations) {
            window.HubSpotConversations.widget.open();
          }
        },
        // Close the chat widget
        close: () => {
          if (process.client && window.HubSpotConversations) {
            window.HubSpotConversations.widget.close();
          }
        },
        // Remove the widget completely
        remove: () => {
          if (process.client && window.HubSpotConversations) {
            window.HubSpotConversations.widget.remove();
          }
        },
        // Check if widget is initialized
        isInitialized: computed(() => isInitialized.value),
        // Check if widget is loaded
        isLoaded: computed(() => isLoaded.value),
        // Check if widget is visible
        isVisible: computed(() => isVisible.value),
      },
    },
  };
});
