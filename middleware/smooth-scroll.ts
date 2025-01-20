import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    // Kill existing ScrollSmoother instance
    const currentSmoother = ScrollSmoother.get();
    if (currentSmoother) {
      currentSmoother.kill();
    }

    // Kill all ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Clear scroll position if navigating to a new page
    if (to.path !== from.path) {
      window.scrollTo(0, 0);
    }
  }
});
