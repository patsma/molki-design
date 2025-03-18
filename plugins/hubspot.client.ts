// TypeScript declarations for HubSpot
declare global {
  interface Window {
    HubSpotConversations: {
      widget: {
        load: (config: { loadImmediately: boolean; inlineEmbedSelector: string }) => void;
        status: () => string;
        refresh: () => void;
        open: () => void;
      };
      on: (event: string, callback: (payload?: any) => void) => void;
    };
  }
}

// Client-side only plugin for HubSpot
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Only run on client-side
  if (process.client) {
    // Debug info for initialization
    const debugHubspot = () => {
      // console.group('🔍 HubSpot Debug Info');
      // console.log('Environment:', process.dev ? 'Development' : 'Production');
      // console.log('Domain:', window.location.hostname);
      // console.log('Portal ID:', config.public.hubspotPortalId);
      // console.log('HubSpot Script Status:', !!window.HubSpotConversations);

      if (window.HubSpotConversations) {
        const status = window.HubSpotConversations.widget.status();
        // console.log('Widget Status:', status);
        // console.log('Widget Configuration:', {
        //   loadImmediately: true,
        //   inlineEmbedSelector: '#hubspot-messages-iframe-container',
        // });
      } else {
        console.warn('HubSpot Conversations not initialized');
      }
      console.groupEnd();
    };

    useHead({
      script: [
        {
          id: 'hs-script-loader',
          src: `//js-eu1.hs-scripts.com/144440300.js`,
          defer: true,
          async: true,
          onload: () => {
            // console.log('🟢 HubSpot script loaded');
            debugHubspot();

            // Initialize widget with configuration
            const initWidget = () => {
              if (window.HubSpotConversations) {
                // console.log('🟢 Initializing HubSpot conversations');

                try {
                  // Configure the widget
                  window.HubSpotConversations.widget.load({
                    loadImmediately: true,
                    inlineEmbedSelector: '#hubspot-messages-iframe-container',
                  });

                  // Use on() instead of addEventListener
                  window.HubSpotConversations.on('hsConversationsLoaded', () => {
                    // console.log('🟢 HubSpot widget fully loaded');
                    debugHubspot();
                  });

                  // Event listeners using on()
                  window.HubSpotConversations.on('widgetOpen', () => {
                    // console.log('🟢 Chat widget opened');
                    debugHubspot();
                  });

                  window.HubSpotConversations.on('widgetClose', () => {
                    // console.log('Chat widget closed');
                  });

                  window.HubSpotConversations.on('messageReceived', (payload) => {
                    // console.log('New message received', payload);
                  });
                } catch (error) {
                  console.error('❌ Error initializing HubSpot widget:', error);
                  debugHubspot();
                }
              } else {
                // console.log('⏳ Waiting for HubSpot to initialize...');
                setTimeout(initWidget, 500);
              }
            };

            initWidget();
          },
          onerror: (error) => {
            console.error('❌ Failed to load HubSpot script:', error);
            debugHubspot();
          },
        },
      ],
    });
  }

  // Provide debug method
  return {
    provide: {
      hubspotDebug: () => {
        if (process.client) {
          console.group('🔍 HubSpot Manual Debug Check');
          // console.log('Current Time:', new Date().toISOString());
          // console.log('HubSpot object exists:', !!window.HubSpotConversations);

          if (window.HubSpotConversations) {
            const status = window.HubSpotConversations.widget.status();
            // console.log('Widget status:', status);
            try {
              window.HubSpotConversations.widget.refresh();
              // console.log('🔄 Widget refreshed');

              // Try to force open the widget
              window.HubSpotConversations.widget.open();
              // console.log('👆 Attempting to open widget');
            } catch (e) {
              console.error('❌ Widget operation failed:', e);
            }
          }

          // Check for common issues
          // console.log('Common Issues Check:', {
          //   isDevelopment: process.dev,
          //   domain: window.location.hostname,
          //   portalId: config.public.hubspotPortalId,
          //   scriptLoaded: !!document.getElementById('hs-script-loader'),
          //   conversationsApiExists: !!window.HubSpotConversations,
          // });

          console.groupEnd();
        }
      },
    },
  };
});
