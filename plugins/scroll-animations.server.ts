// Server-side plugin to handle scroll animation directive during SSR
// This prevents SSR warnings for the v-scroll-anim directive

import type { Directive } from 'vue';

/**
 * Register a no-op version of the scroll animation directive for server-side rendering
 * This prevents Vue warnings about unknown directives during SSR
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (!process.server) return;

  // Create a no-op directive for server-side rendering
  const noopDirective: Directive = {
    mounted() {}, // No-op
    updated() {}, // No-op
    unmounted() {}, // No-op
  };

  // Register the no-op directive on the server
  nuxtApp.vueApp.directive('scroll-anim', noopDirective);
});
