import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import gsap from 'gsap';
import { useMobileDetection } from '~/composables/useMobileDetection';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log("🎯 GlobalMiddleware: Called");

  if (!process.client) {
    // console.log("⚡ Middleware: Skipping - server side");
    return;
  }

  const { isMobile } = useMobileDetection();

  // Add check for initial load
  if (window.__gsap_first_load) {
    window.__gsap_first_load = false;
    return;
  }

  try {
    window.__gsap_first_load = true;
    const currentSmoother = ScrollSmoother.get();
    if (currentSmoother) {
      // console.log("📜 Middleware: Resetting smoother");
      currentSmoother.scrollTop(0);

      // Reset all data-speed elements
      const elements = document.querySelectorAll('[data-speed]');
      // console.log(`📊 Found ${elements.length} data-speed elements`);

      elements.forEach((el) => {
        gsap.set(el, {
          clearProps: 'transform,willChange',
        });
      });

      // Reapply effects
      await nextTick();
      ScrollTrigger.refresh(true);
      currentSmoother.effects('[data-speed], [data-lag]', true);
    }

    // Expand element selection
    const elements = document.querySelectorAll(
      '[data-speed], [data-scroll-item], [data-scroll-section]'
    );
    elements.forEach((el) => {
      gsap.set(el, {
        clearProps: 'transform,willChange,opacity,y,x,scale',
      });
    });

    await nextTick();
    ScrollTrigger.refresh(true);

    if (currentSmoother) {
      currentSmoother.effects('[data-speed], [data-lag]', true);
    }
  } catch (error) {
    console.error('❌ Middleware: Error', error);
  }
});
