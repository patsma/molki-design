import { defineStore } from 'pinia';

/**
 * Simple store for managing the global loader state
 */
export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isVisible: true,
  }),

  actions: {
    /**
     * Hide the loader and mark app as ready
     */
    hide() {
      this.isVisible = false;
    },

    /**
     * Show the loader (used for page transitions if needed)
     */
    show() {
      this.isVisible = true;
    },
  },
});
