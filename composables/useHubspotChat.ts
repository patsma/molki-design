import { Ref } from 'vue'

export const useHubspotChat = () => {
  const { $hubspot } = useNuxtApp()
  
  // Initialize the chat widget
  const init = () => {
    $hubspot.init()
  }

  // Open the chat widget
  const open = () => {
    $hubspot.open()
  }

  // Close the chat widget
  const close = () => {
    $hubspot.close()
  }

  // Remove the widget completely
  const remove = () => {
    $hubspot.remove()
  }

  // Reactive states
  const isInitialized: Ref<boolean> = $hubspot.isInitialized
  const isLoaded: Ref<boolean> = $hubspot.isLoaded
  const isVisible: Ref<boolean> = $hubspot.isVisible

  return {
    init,
    open,
    close,
    remove,
    isInitialized,
    isLoaded,
    isVisible
  }
} 