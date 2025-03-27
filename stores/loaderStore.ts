import { defineStore } from 'pinia';

/**
 * Store for managing the global loader state
 * Used to show/hide the loading indicator when navigating between pages
 * or during initial application load
 */
export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isActive: true,
    appMounted: false,
    pageReady: false,
    imagesLoaded: false,
    animationsReady: false,
  }),

  getters: {
    /**
     * Check if everything is loaded and ready
     */
    isEverythingReady: (state) => {
      return state.appMounted && state.pageReady && state.imagesLoaded && state.animationsReady;
    },
  },

  actions: {
    /**
     * Show the loader
     */
    show() {
      this.isActive = true;
    },

    /**
     * Hide the loader
     */
    hide() {
      this.isActive = false;
    },

    /**
     * Set app as mounted
     */
    setAppMounted() {
      this.appMounted = true;
      this.checkAllLoaded();
    },

    /**
     * Set page as ready
     */
    setPageReady() {
      this.pageReady = true;
      this.checkAllLoaded();
    },

    /**
     * Set images as loaded
     */
    setImagesLoaded() {
      this.imagesLoaded = true;
      this.checkAllLoaded();
    },

    /**
     * Set animations as ready
     */
    setAnimationsReady() {
      this.animationsReady = true;
      this.checkAllLoaded();
    },

    /**
     * Check if everything is loaded and hide the loader if it is
     */
    checkAllLoaded() {
      if (this.isEverythingReady) {
        setTimeout(() => {
          this.hide();
          // Emit a custom event to trigger animations
          if (process.client) {
            window.dispatchEvent(new Event('start-animations'));
          }
        }, 300);
      }
    },
  },
});
