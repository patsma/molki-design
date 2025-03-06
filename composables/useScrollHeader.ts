import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { useElementBounding } from '@vueuse/core';
import { useMobileDetection } from '~/composables/useMobileDetection';
import { useThrottleFn } from '@vueuse/core';

export const useScrollHeader = () => {
  const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

  const headerRef = ref<HTMLElement | null>(null);
  const { height: headerHeight } = useElementBounding(headerRef);
  const { isMobile } = useMobileDetection();

  let headerAnimation: any = null;
  let ctx: any = null;

  const initScrollHeader = () => {
    if (!process.client || !headerRef.value) return;

    // Clean up previous context if it exists
    if (ctx) ctx.revert();

    // Create a fresh GSAP context for proper cleanup
    ctx = $gsap.context(() => {
      // Use different initialization based on device
      if (isMobile.value) {
        initMobileHeader();
      } else {
        initDesktopHeader();
      }
    });
  };

  const initDesktopHeader = () => {
    if (!headerRef.value) return;

    // Initial setup
    $gsap.set(headerRef.value, {
      height: headerHeight.value,
      top: 0,
      y: 0,
      yPercent: 0,
    });

    // Create animation once and reuse it
    headerAnimation = $gsap
      .timeline({ paused: true })
      .to(headerRef.value, { yPercent: -100, duration: 0.3, ease: 'power2.inOut' });

    // Create scroll trigger for animation
    $ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: useThrottleFn((self) => {
        // Get smoother instance properly
        const smoother = $ScrollSmoother.get();

        // Get scroll position from smoother if available
        const scrollY = smoother ? smoother.scrollTop() : window.scrollY;
        const velocity = Math.abs(self.getVelocity());

        // Only animate when there's actual meaningful scrolling
        if (velocity < 5) return;

        if (self.direction > 0 && scrollY > headerHeight.value) {
          // Scrolling down - hide header
          if (!headerAnimation.progress() || headerAnimation.reversed()) {
            headerAnimation.play();
          }
        } else if (self.direction < 0) {
          // Scrolling up - show header
          if (headerAnimation.progress() && !headerAnimation.reversed()) {
            headerAnimation.reverse();
          }
        }
      }, 300),
    });

    // Pin the header - ensure it's properly set up for ScrollSmoother
    $ScrollTrigger.create({
      trigger: headerRef.value,
      start: 'top top',
      end: 'max',
      pin: true,
      pinSpacing: false,
    });
  };

  const initMobileHeader = () => {
    if (!headerRef.value) return;

    // Initial setup
    $gsap.set(headerRef.value, {
      height: headerHeight.value,
      top: 0,
      y: 0,
      yPercent: 0,
    });

    // Create animation once and reuse it
    headerAnimation = $gsap
      .timeline({ paused: true })
      .to(headerRef.value, { yPercent: -100, duration: 0.3, ease: 'power2.inOut' });

    // Create scroll trigger for animation
    $ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: useThrottleFn((self) => {
        const scrollY = window.scrollY;
        const velocity = Math.abs(self.getVelocity());
        const minScroll = Math.min(100, headerHeight.value);

        // Only animate when there's actual meaningful scrolling
        if (velocity < 5) return;

        if (self.direction > 0 && scrollY > minScroll) {
          // Scrolling down - hide header
          if (!headerAnimation.progress() || headerAnimation.reversed()) {
            headerAnimation.play();
          }
        } else if (self.direction < 0) {
          // Scrolling up - show header
          if (headerAnimation.progress() && !headerAnimation.reversed()) {
            headerAnimation.reverse();
          }
        }
      }, 300),
    });

    // Pin the header
    $ScrollTrigger.create({
      trigger: headerRef.value,
      start: 'top top',
      end: 'max',
      pin: true,
      pinSpacing: false,
    });
  };

  const cleanup = () => {
    // Let GSAP context handle all the cleanup
    if (ctx) {
      ctx.revert();
      ctx = null;
    }
  };

  return {
    headerRef,
    headerHeight,
    initScrollHeader,
    cleanup,
  };
};
