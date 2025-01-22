import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client && to.path !== from.path) {
    // Kill all instances on route change
    const currentSmoother = ScrollSmoother.get();
    if (currentSmoother) {
      currentSmoother.scrollTop(0); // Use smoother's method instead of window.scrollTo
      currentSmoother.kill();
    }

    // Kill ALL ScrollTriggers without exceptions
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
});
