import { defineStore } from 'pinia';

/**
 * Store for managing the global loader state
 * Used to show/hide the loading indicator when navigating between pages
 * or during initial application load
 */
export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isActive: true,
  }),

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
  },
});
