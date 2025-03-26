import { useLoaderStore } from '~/stores/loaderStore';

/**
 * Page transitions plugin
 * Handles animation initialization and cleanup during page navigation
 */
export default defineNuxtPlugin((nuxtApp) => {
  const loaderStore = useLoaderStore();

  // Detect if browser is Safari
  const isSafari = () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  };

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

  // Handle page transitions and loader state
  nuxtApp.hook('page:finish', () => {
    if (!process.client) return;

    // Reset scroll position
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Use longer delay for Safari
    const delay = isSafari() ? 350 : 250;

    // Wait for the page transition to complete first
    const pageTransitionElement = document.querySelector('.page-leave-active, .page-enter-active');

    if (pageTransitionElement) {
      pageTransitionElement.addEventListener(
        'transitionend',
        () => {
          setTimeout(() => {
            loaderStore.hide();
          }, delay);
        },
        { once: true }
      );
    } else {
      setTimeout(() => {
        loaderStore.hide();
      }, delay);
    }
  });
});
