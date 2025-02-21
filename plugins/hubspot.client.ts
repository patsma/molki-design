// Client-side only plugin for HubSpot
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Only run on client-side
  if (process.client) {
    useHead({
      script: [
        {
          id: 'hs-script-loader',
          src: `//js-eu1.hs-scripts.com/144440300.js`,
          defer: true,
          async: true,
          onload: () => {
            console.log('HubSpot script loaded');

            // Initialize widget with configuration
            const initWidget = () => {
              if (window.HubSpotConversations) {
                console.log('Initializing HubSpot conversations');

                // Configure the widget
                window.HubSpotConversations.widget.load({
                  loadImmediately: true,
                  inlineEmbedSelector: '#hubspot-messages-iframe-container',
                });

                // Use on() instead of addEventListener
                window.HubSpotConversations.on('hsConversationsLoaded', () => {
                  console.log('HubSpot widget fully loaded');

                  // Debug widget status
                  const status = window.HubSpotConversations.widget.status();
                  console.log('Initial widget status:', status);
                });

                // Event listeners using on()
                window.HubSpotConversations.on('widgetOpen', () => {
                  console.log('Chat widget opened');
                });

                window.HubSpotConversations.on('widgetClose', () => {
                  console.log('Chat widget closed');
                });

                window.HubSpotConversations.on('messageReceived', (payload) => {
                  console.log('New message received', payload);
                });
              } else {
                console.log('Waiting for HubSpot to initialize...');
                setTimeout(initWidget, 500);
              }
            };

            initWidget();
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
          console.log('HubSpot object exists:', !!window.HubSpotConversations);
          if (window.HubSpotConversations) {
            console.log('Widget status:', window.HubSpotConversations.widget.status());
            try {
              window.HubSpotConversations.widget.refresh();
              console.log('Widget refreshed');
            } catch (e) {
              console.error('Failed to refresh widget:', e);
            }
          }
        }
      },
    },
  };
});
