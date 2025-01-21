import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export const useScrollHeader = (selector: string) => {
  const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();
  let headerTrigger: ScrollTrigger | null = null;
  let headerAnimation: gsap.core.Timeline | null = null;

  const initScrollHeader = () => {
    console.log("🚀 Initializing ScrollHeader");
    if (!process.client) return;

    const header = document.querySelector(selector);
    if (!header) return;

    // Pin the header
    headerTrigger = $ScrollTrigger.create({
      trigger: header,
      start: "top top",
      endTrigger: "html",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
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
        const smoother = $ScrollSmoother.get();
        if (!smoother) return;

        const velocity = Math.abs(smoother.getVelocity());
        const scrollTop = smoother.scrollTop();
        const direction = self.direction;

        // Show/hide header based on scroll direction
        if (direction > 0 && velocity > 15 && scrollTop > 100) {
          headerAnimation?.play();
        } else if (direction < 0 || scrollTop < 100) {
          headerAnimation?.reverse();
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
  };

  return {
    initScrollHeader,
    cleanup,
  };
};
