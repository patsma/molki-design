import { useNuxtApp } from '#app';
import { useElementBounding, useResizeObserver, useThrottleFn } from '@vueuse/core';
import { useMobileDetection } from '~/composables/useMobileDetection';
import type { UseResizeObserverReturn } from '@vueuse/core';

export const useScrollHeader = () => {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  const headerRef = ref<HTMLElement | null>(null);
  const { height: headerHeight } = useElementBounding(headerRef, { reset: false });
  const { isMobile } = useMobileDetection();

  let headerAnimation: gsap.core.Timeline | null = null;
  let ctx: gsap.Context | null = null;
  let scrollTriggerInstance: any = null;
  let pinInstance: any = null;

  // For mobile scroll listener
  let lastScrollY = 0;
  let ticking = false;

  // Use resize observer for more reliable size tracking
  const stopResizeObserver = ref<UseResizeObserverReturn | null>(null);

  // Set CSS variables based on header height
  const setHeaderHeightCSSVars = () => {
    if (!process.client || !headerHeight.value) return;

    const height = headerHeight.value;
    const isMobileView = window.innerWidth < 768;

    document.documentElement.style.setProperty('--header-height', `${height}px`);

    if (isMobileView) {
      document.documentElement.style.setProperty('--header-height-mobile', `${height}px`);
    } else {
      document.documentElement.style.setProperty('--header-height-desktop', `${height}px`);
    }
  };

  // Handle header resize with debounce for performance
  const handleResize = useThrottleFn(() => {
    if (!headerRef.value || !headerHeight.value) return;

    // Update header height in GSAP
    $gsap.set(headerRef.value, {
      height: headerHeight.value,
    });

    // Update CSS variables
    setHeaderHeightCSSVars();

    // Refresh ScrollTrigger to update positions
    $ScrollTrigger?.refresh(true);

    // Reinitialize if needed
    if (!ctx) {
      initScrollHeader();
    }
  }, 200);

  // Watch for header height changes
  watch(headerHeight, (newHeight, oldHeight) => {
    if (newHeight && process.client && Math.abs(newHeight - (oldHeight || 0)) > 2) {
      handleResize();
    }
  });

  const initResizeObserver = () => {
    if (!headerRef.value || !process.client) return;

    try {
      // Clear existing observer
      if (stopResizeObserver.value?.stop) {
        stopResizeObserver.value.stop();
      }

      // Create new resize observer
      stopResizeObserver.value = useResizeObserver(headerRef, () => {
        handleResize();
      });
    } catch (error) {
      console.warn('Error initializing resize observer:', error);
    }
  };

  const initScrollHeader = () => {
    if (!process.client || !headerRef.value) return;

    try {
      // Clean up previous instances
      cleanup();

      // Set initial header height CSS variables
      setHeaderHeightCSSVars();

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
    } catch (error) {
      console.warn('Error initializing scroll header:', error);
    }
  };

  const initDesktopHeader = () => {
    if (!headerRef.value) return;

    try {
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
          const scrollY = window.scrollY;
          const velocity = Math.abs(self.getVelocity());

          if (velocity < 5) return;

          if (self.direction > 0 && scrollY > headerHeight.value) {
            if (headerAnimation && (!headerAnimation.progress() || headerAnimation.reversed())) {
              headerAnimation.play();
            }
          } else if (self.direction < 0) {
            if (headerAnimation && headerAnimation.progress() && !headerAnimation.reversed()) {
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
    } catch (error) {
      console.warn('Error initializing desktop header:', error);
    }
  };

  // Simple scroll handler for mobile
  const handleScroll = useThrottleFn(() => {
    if (!headerRef.value) return;

    try {
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
          y: '-100%',
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
    } catch (error) {
      console.warn('Error in scroll handler:', error);
    }
  }, 100);

  const initMobileHeader = () => {
    if (!headerRef.value) return;

    try {
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
      window.addEventListener('scroll', handleScroll, { passive: true });
    } catch (error) {
      console.warn('Error initializing mobile header:', error);
    }
  };

  const cleanup = () => {
    if (!process.client) return;

    try {
      // Remove scroll listener
      window.removeEventListener('scroll', handleScroll);

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
    } catch (error) {
      console.warn('Error during cleanup:', error);
    }
  };

  // Clean up on component unmount
  onUnmounted(() => {
    if (process.client) {
      cleanup();
    }
  });

  // Watch for mobile/desktop changes to reinitialize
  watch(
    () => isMobile.value,
    () => {
      if (process.client) {
        initScrollHeader();
      }
    }
  );

  return {
    headerRef,
    headerHeight,
    initScrollHeader,
    cleanup,
    setHeaderHeightCSSVars,
  };
};
