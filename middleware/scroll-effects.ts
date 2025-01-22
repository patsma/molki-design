import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    console.log("🚀 Middleware: Handling route change", {
      from: from.path,
      to: to.path,
    });

    const currentSmoother = ScrollSmoother.get();
    if (currentSmoother) {
      console.log("📜 Middleware: Killing current smoother");
      currentSmoother.kill();
    }

    // Kill all ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => {
      console.log("🎯 Middleware: Killing trigger", trigger.vars);
      trigger.kill();
    });

    // Force immediate scroll reset
    if (to.path !== from.path) {
      console.log("↕️ Middleware: Resetting scroll position");
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }
});
