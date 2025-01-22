import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    // Kill existing ScrollSmoother instance
    const currentSmoother = ScrollSmoother.get();
    if (currentSmoother) {
      currentSmoother.kill();
    }

    // Kill all ScrollTriggers except header pin
    ScrollTrigger.getAll().forEach((trigger) => {
      // Check if this is the header pin trigger
      const isHeaderTrigger = trigger.vars.trigger?.classList?.contains("nav");
      if (!isHeaderTrigger) {
        trigger.kill();
      }
    });

    // Clear scroll position if navigating to a new page
    if (to.path !== from.path) {
      window.scrollTo(0, 0);
    }
  }
});
