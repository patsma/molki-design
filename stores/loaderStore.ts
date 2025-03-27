import { defineStore } from 'pinia';

/**
 * Store for managing the global loader state
 * Used to show/hide the loading indicator when navigating between pages
 */
export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isActive: true,
    imagesLoaded: false,
    contentReady: false,
  }),

  getters: {
    /**
     * Check if everything is ready to hide the loader
     */
    isReadyToHide: (state) => {
      return state.imagesLoaded && state.contentReady;
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
     * Reset the loader state for page transitions
     */
    reset() {
      this.imagesLoaded = false;
      this.contentReady = false;
      this.isActive = true;
    },

    /**
     * Mark images as loaded
     */
    setImagesLoaded() {
      this.imagesLoaded = true;
      this.checkReady();
    },

    /**
     * Mark content as ready
     */
    setContentReady() {
      this.contentReady = true;
      this.checkReady();
    },

    /**
     * Check if everything is ready and hide loader if so
     */
    checkReady() {
      if (this.isReadyToHide) {
        setTimeout(() => {
          this.hide();
        }, 200);
      }
    },
  },
});
