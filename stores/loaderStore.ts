import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isLoading: true,
    isHidden: false,
  }),

  actions: {
    startLoading() {
      this.isLoading = true;
      this.isHidden = false;
    },

    finishLoading() {
      this.isLoading = false;
      // Add a small delay before hiding to allow for transitions
      setTimeout(() => {
        this.isHidden = true;
      }, 300);
    },
  },
});
