// Update the Window interface
declare global {
  interface Window {
    HubSpotConversations: {
      widget: {
        load(config?: { loadImmediately?: boolean; inlineEmbedSelector?: string }): void;
        open(): void;
        close(): void;
        status(): { loaded: boolean; pending: boolean };
        refresh(): void;
      };
      on(event: string, callback: (payload?: any) => void): void;
    };
  }
}
export const useHubspotChat = () => {
  const isWidgetReady = ref(false);
  const widgetStatus = ref<'open' | 'closed' | 'unknown'>('unknown');
  const initializationAttempts = ref(0);

  const checkWidgetStatus = () => {
    if (process.client && window.HubSpotConversations) {
      const status = window.HubSpotConversations.widget.status();
      console.log('Current widget status:', status);
      widgetStatus.value = status.open ? 'open' : 'closed';
      isWidgetReady.value = status.loaded;
      return status;
    }
    return null;
  };

  const initializeWidget = () => {
    if (process.client && window.HubSpotConversations) {
      try {
        console.log('Attempting to initialize widget...');
        window.HubSpotConversations.widget.load();
        window.HubSpotConversations.widget.refresh();
        checkWidgetStatus();
      } catch (e) {
        console.error('Failed to initialize widget:', e);
      }
    }
  };

  const openChat = () => {
    if (process.client) {
      if (!window.HubSpotConversations) {
        console.error('HubSpot widget not initialized');
        initializationAttempts.value++;
        if (initializationAttempts.value <= 3) {
          console.log(`Retrying initialization (attempt ${initializationAttempts.value})...`);
          initializeWidget();
          setTimeout(openChat, 1000);
        }
        return;
      }

      console.log('Attempting to open chat...');
      try {
        window.HubSpotConversations.widget.refresh();
        window.HubSpotConversations.widget.open();
        checkWidgetStatus();
      } catch (e) {
        console.error('Failed to open chat:', e);
      }
    }
  };

  const closeChat = () => {
    if (process.client && window.HubSpotConversations) {
      try {
        window.HubSpotConversations.widget.close();
        checkWidgetStatus();
      } catch (e) {
        console.error('Failed to close chat:', e);
      }
    }
  };

  // Initialize widget status check
  onMounted(() => {
    if (process.client) {
      let attempts = 0;
      const maxAttempts = 20; // 10 seconds total

      const checkInterval = setInterval(() => {
        attempts++;
        if (window.HubSpotConversations) {
          console.log('HubSpot found, initializing...');
          initializeWidget();
          isWidgetReady.value = true;
          checkWidgetStatus();
          clearInterval(checkInterval);
        } else if (attempts >= maxAttempts) {
          console.error('HubSpot widget failed to initialize after 10 seconds');
          clearInterval(checkInterval);
        }
      }, 500);
    }
  });

  return {
    openChat,
    closeChat,
    isWidgetReady,
    widgetStatus,
    checkWidgetStatus,
    initializeWidget,
  };
};
