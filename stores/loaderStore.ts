import { defineStore } from 'pinia';

/**
 * Simple store for managing the global loader state
 */
export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isLoading: true,
  }),

  actions: {
    /**
     * Hide the loader and mark app as ready
     */
    hideLoader() {
      this.isLoading = false;
    },

    /**
     * Show the loader (used for page transitions if needed)
     */
    showLoader() {
      this.isLoading = true;
    },
  },
});
