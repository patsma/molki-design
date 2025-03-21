import { useNuxtApp } from '#app';
import { useElementBounding, useResizeObserver, useThrottleFn } from '@vueuse/core';
import { useMobileDetection } from '~/composables/useMobileDetection';
import type { UseResizeObserverReturn } from '@vueuse/core';

export const useScrollHeader = () => {
  const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

  const headerRef = ref<HTMLElement | null>(null);
  const { height: headerHeight } = useElementBounding(headerRef);
  const { isMobile } = useMobileDetection();

  let headerAnimation: any = null;
  let ctx: any = null;
  let scrollTriggerInstance: any = null;
  let pinInstance: any = null;

  // For mobile scroll listener
  let lastScrollY = 0;
  let ticking = false;

  // Use resize observer for more reliable size tracking
  const stopResizeObserver = ref<UseResizeObserverReturn | null>(null);

  // Handle header resize
  const handleResize = useThrottleFn(() => {
    if (!headerRef.value || !headerHeight.value) return;

    // Update header height in GSAP
    $gsap.set(headerRef.value, {
      height: headerHeight.value,
    });

    // Refresh ScrollTrigger to update positions
    $ScrollTrigger.refresh(true);

    // Reinitialize if needed
    if (!ctx) {
      initScrollHeader();
    }
  }, 200);

  // Watch for header height changes
  watch(headerHeight, (newHeight) => {
    if (newHeight && process.client) {
      handleResize();
    }
  });

  const initResizeObserver = () => {
    if (!headerRef.value) return;

    if (stopResizeObserver.value?.stop) {
      stopResizeObserver.value.stop();
    }

    stopResizeObserver.value = useResizeObserver(headerRef, () => {
      handleResize();
    });
  };

  const initScrollHeader = () => {
    if (!process.client || !headerRef.value) return;

    // Clean up previous instances
    cleanup();

    // Create a fresh GSAP context for proper cleanup
    ctx = $gsap.context(() => {
      // Use different initialization based on device
      if (isMobile.value) {
        initMobileHeader();
      } else {
        initDesktopHeader();
      }
    });

    // Initialize resize observer
    initResizeObserver();
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
    scrollTriggerInstance = $ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: useThrottleFn((self) => {
        const smoother = $ScrollSmoother.get();
        const scrollY = smoother ? smoother.scrollTop() : window.scrollY;
        const velocity = Math.abs(self.getVelocity());

        if (velocity < 5) return;

        if (self.direction > 0 && scrollY > headerHeight.value) {
          if (!headerAnimation.progress() || headerAnimation.reversed()) {
            headerAnimation.play();
          }
        } else if (self.direction < 0) {
          if (headerAnimation.progress() && !headerAnimation.reversed()) {
            headerAnimation.reverse();
          }
        }
      }, 300),
    });

    // Pin the header
    pinInstance = $ScrollTrigger.create({
      trigger: headerRef.value,
      start: 'top top',
      end: 'max',
      pin: true,
      pinSpacing: false,
    });
  };

  // Simple scroll handler for mobile
  const handleScroll = useThrottleFn(() => {
    if (!headerRef.value) return;

    const currentScrollY = window.scrollY;

    // Only trigger after scrolling a minimum distance
    if (Math.abs(currentScrollY - lastScrollY) < 10) {
      return;
    }

    // Scroll direction
    const scrollingDown = currentScrollY > lastScrollY;

    // Show/hide header based on scroll direction and position
    if (scrollingDown && currentScrollY > headerHeight.value) {
      // Scrolling down - hide header
      $gsap.to(headerRef.value, {
        y: -100 + '%',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else if (!scrollingDown) {
      // Scrolling up - show header
      $gsap.to(headerRef.value, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    lastScrollY = currentScrollY;
  }, 100);

  const initMobileHeader = () => {
    if (!headerRef.value) return;

    // Set initial position for mobile
    $gsap.set(headerRef.value, {
      y: 0,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 50,
      height: headerHeight.value,
    });

    // Reset scroll values
    lastScrollY = window.scrollY;
    ticking = false;

    // Add scroll listener for mobile
    window.addEventListener('scroll', handleScroll);
  };

  const cleanup = () => {
    // Remove scroll listener
    if (process.client) {
      window.removeEventListener('scroll', handleScroll);
    }

    // Clean up GSAP animations and ScrollTrigger instances
    if (headerAnimation) {
      headerAnimation.kill();
      headerAnimation = null;
    }

    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
      scrollTriggerInstance = null;
    }

    if (pinInstance) {
      pinInstance.kill();
      pinInstance = null;
    }

    // Clean up GSAP context
    if (ctx) {
      ctx.revert();
      ctx = null;
    }

    // Clean up resize observer
    if (stopResizeObserver.value?.stop) {
      stopResizeObserver.value.stop();
    }
    stopResizeObserver.value = null;
  };

  // Clean up on component unmount
  onUnmounted(() => {
    cleanup();
  });

  return {
    headerRef,
    headerHeight,
    initScrollHeader,
    cleanup,
  };
};
