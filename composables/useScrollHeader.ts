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

  // For mobile scroll listener
  let lastScrollY = 0;
  let ticking = false;

  const initScrollHeader = () => {
    if (!process.client || !headerRef.value) return;

    // Clean up previous context if it exists
    if (ctx) ctx.revert();

    // Remove scroll listener if exists
    window.removeEventListener('scroll', handleScroll);

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

  // Simple scroll handler for mobile
  const handleScroll = () => {
    if (!ticking && headerRef.value) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Only trigger after scrolling a minimum distance
        if (Math.abs(currentScrollY - lastScrollY) < 10) {
          ticking = false;
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
        ticking = false;
      });

      ticking = true;
    }
  };

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

    // Add simple scroll listener for mobile
    window.addEventListener('scroll', handleScroll);
  };

  const cleanup = () => {
    // Remove scroll listener
    if (process.client) {
      window.removeEventListener('scroll', handleScroll);
    }

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
