import { useLoaderStore } from '~/stores/loaderStore';

/**
 * Page transitions plugin
 * Handles animation initialization and cleanup during page navigation
 */
export default defineNuxtPlugin((nuxtApp) => {
  const loaderStore = useLoaderStore();

  // Indicate when navigating between pages begins
  nuxtApp.hook('page:start', () => {
    if (!process.client) return;

    // Show loader during navigation
    loaderStore.show();

    // Clear animations when navigation starts
    if (useNuxtApp().$scrollAnimations?.clear) {
      useNuxtApp().$scrollAnimations.clear();
    }
  });

  // Initialize animations when page has loaded
  nuxtApp.hook('page:finish', () => {
    if (!process.client) return;

    // Hide loader after navigation completes
    setTimeout(() => {
      loaderStore.hide();
    }, 200);
  });
});
