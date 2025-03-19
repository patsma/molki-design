import { Ref } from 'vue';

export const useHubspotChat = () => {
  const { $hubspot } = useNuxtApp();

  // Initialize the chat widget
  const init = (): void => {
    $hubspot.init();
  };

  // Open the chat widget
  const open = (): void => {
    $hubspot.open();
  };

  // Close the chat widget
  const close = (): void => {
    $hubspot.close();
  };

  // Remove the widget completely
  const remove = (): void => {
    $hubspot.remove();
  };

  // Reactive states
  const isInitialized: Ref<boolean> = $hubspot.isInitialized;
  const isLoaded: Ref<boolean> = $hubspot.isLoaded;
  const isVisible: Ref<boolean> = $hubspot.isVisible;

  return {
    init,
    open,
    close,
    remove,
    isInitialized,
    isLoaded,
    isVisible,
  };
};
