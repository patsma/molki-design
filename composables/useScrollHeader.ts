import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ref } from "vue";

export const useScrollHeader = (selector: string) => {
  const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();
  let headerTrigger: ScrollTrigger | null = null;
  let headerAnimation: gsap.core.Timeline | null = null;
  const headerHeight = ref(0);
  let lastCheck = 0;
  const initScrollHeader = () => {
    console.log("🚀 Initializing ScrollHeader");
    if (!process.client) return;

    const header = document.querySelector(selector);
    if (!header) return;

    // Only measure height if it hasn't been set yet
    if (headerHeight.value === 0) {
      headerHeight.value = header.getBoundingClientRect().height;
      console.log("📏 Initial header height:", headerHeight.value);
    }

    // Ensure header has correct height before pinning
    gsap.set(header, {
      height: headerHeight.value,
      clearProps: "all", // Clear all other properties
    });

    // Pin the header
    headerTrigger = $ScrollTrigger.create({
      trigger: header,
      start: "top top",
      endTrigger: "html",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      onRefresh: () => {
        // Ensure header maintains correct height during refresh
        gsap.set(header, { height: headerHeight.value });
      },
    });

    // Create hide/show animation
    headerAnimation = $gsap
      .timeline({ paused: true })
      .fromTo(
        header,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.3, ease: "power3.inOut" }
      );

    // Create scroll listener
    $ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const now = Date.now();
        if (now - lastCheck < 400) return;
        lastCheck = now;

        const smoother = $ScrollSmoother.get();
        if (!smoother) return;

        const scrollTop = smoother.scrollTop();
        const direction = self.direction;

        if (direction > 0 && scrollTop > headerHeight.value) {
          gsap.to(header, { yPercent: -100, duration: 0.3 });
        } else if (direction < 0) {
          gsap.to(header, { yPercent: 0, duration: 0.3 });
        }
      },
    });
  };

  const cleanup = () => {
    if (headerTrigger) {
      headerTrigger.kill();
      headerTrigger = null;
    }
    if (headerAnimation) {
      headerAnimation.kill();
      headerAnimation = null;
    }
    // Don't reset headerHeight as we want to maintain it between route changes
  };

  return {
    initScrollHeader,
    cleanup,
    headerHeight, // Expose height for potential use elsewhere
  };
};
