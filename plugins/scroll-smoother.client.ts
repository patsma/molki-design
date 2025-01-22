import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default defineNuxtPlugin((nuxtApp) => {
  const { $gsap, $ScrollTrigger, $ScrollSmoother } = nuxtApp;
  let scrollSmoother = null;

  const initScrollSmoother = () => {
    // Register plugins
    $gsap.registerPlugin($ScrollTrigger, $ScrollSmoother);

    console.log("🎨 Plugin: Creating ScrollSmoother");
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");

    if (wrapper && content) {
      scrollSmoother = $ScrollSmoother.create({
        wrapper: wrapper,
        content: content,
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        touchMultiplier: 2,
        ignoreMobileResize: true,
      });

      // Initialize effects
      const elements = document.querySelectorAll("[data-speed], [data-lag]");
      console.log(`📊 Plugin: Found ${elements.length} effect elements`);
      scrollSmoother.effects("[data-speed], [data-lag]", {});
    }
  };

  const resetEffects = () => {
    if (!scrollSmoother) return;

    console.log("🔄 Plugin: Resetting effects");
    const elements = document.querySelectorAll("[data-speed]");
    elements.forEach((el) => {
      $gsap.set(el, {
        clearProps: "transform,willChange",
      });
    });

    $ScrollTrigger.refresh(true);
    scrollSmoother.effects("[data-speed], [data-lag]", true);
  };

  // Initialize on plugin load
  if (process.client) {
    initScrollSmoother();
  }

  // Handle page transitions
  nuxtApp.hook("page:transition:finish", () => {
    console.log("📄 Plugin: Page transition finished");
    if (scrollSmoother) {
      scrollSmoother.scrollTop(0);
      resetEffects();
    }
  });

  // Cleanup on app unmount
  nuxtApp.hook("app:unmount", () => {
    if (scrollSmoother) {
      console.log("🧹 Plugin: Cleaning up ScrollSmoother");
      scrollSmoother.kill();
    }
  });

  // Provide methods to components
  return {
    provide: {
      smoothScroller: {
        get: () => scrollSmoother,
        reset: resetEffects,
      },
    },
  };
});
