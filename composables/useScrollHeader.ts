import { useElementBounding } from '@vueuse/core';
import { useMobileDetection } from '~/composables/useMobileDetection';
import { useThrottleFn } from '@vueuse/core';

export const useScrollHeader = () => {
  const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp();

  const headerRef = ref<HTMLElement | null>(null);
  const { height: headerHeight } = useElementBounding(headerRef);
  const { isMobile } = useMobileDetection();

  // Track header visibility state
  const isHeaderVisible = ref(true);

  let headerTrigger: any = null;
  let headerAnimation: any = null;

  const initScrollHeader = () => {
    // console.log('🎯 Initializing scroll header');
    if (!process.client || !headerRef.value) {
      // console.log('⚠️ Header initialization skipped:', {
      //   isClient: process.client,
      //   hasHeaderRef: !!headerRef.value,
      // });
      return;
    }

    if (isMobile.value) {
      // console.log('📱 Initializing mobile header');
      initMobileHeader();
      return;
    }

    // console.log('🖥️ Initializing desktop header');
    // Ensure header has correct height before pinning
    $gsap.set(headerRef.value, {
      height: headerHeight.value,
      // clearProps: 'all', // Clear all other properties
    });

    // Pin the header
    headerTrigger = $ScrollTrigger.create({
      trigger: headerRef.value,
      start: 'top top',
      endTrigger: 'html',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      onRefresh: () => {
        // Ensure header maintains correct height during refresh
        $gsap.set(headerRef.value, { height: headerHeight.value });
      },
    });

    // Create hide/show animation
    headerAnimation = $gsap
      .timeline({ paused: true })
      .fromTo(
        headerRef.value,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.3, ease: 'power3.inOut' }
      );

    // Create scroll listener
    $ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: useThrottleFn((self) => {
        const smoother = $ScrollSmoother.get();
        if (!smoother) return;

        const scrollTop = smoother.scrollTop();
        const direction = self.direction;

        // Only trigger animations when state actually changes
        if (direction > 0 && scrollTop > headerHeight.value && isHeaderVisible.value) {
          isHeaderVisible.value = false;
          // Ensure clean animation by killing any in-progress tweens
          $gsap.killTweensOf(headerRef.value);
          $gsap.to(headerRef.value, { yPercent: -100, duration: 0.3 });
        } else if (direction < 0 && !isHeaderVisible.value) {
          isHeaderVisible.value = true;
          // Ensure clean animation by killing any in-progress tweens
          $gsap.killTweensOf(headerRef.value);
          $gsap.to(headerRef.value, { yPercent: 0, duration: 0.3 });
        }
      }, 400), // Throttle to 400ms between executions
    });
  };

  const initMobileHeader = () => {
    const header = headerRef.value;
    if (!header) {
      console.warn('⚠️ Header element not found');
      return;
    }

    // Reset visibility state
    isHeaderVisible.value = true;

    // Same setup as desktop
    $gsap.set(header, {
      top: 0,
      height: headerHeight.value,
      clearProps: 'all',
    });

    // Same pin configuration
    headerTrigger = $ScrollTrigger.create({
      trigger: header,
      start: 'top top',
      endTrigger: 'html',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      onRefresh: () => {
        $gsap.set(header, { height: headerHeight.value });
      },
    });

    // Create animation timeline but don't use play/reverse approach
    // This allows more control over the animation state
    headerAnimation = $gsap.timeline({ paused: true });

    // Modified scroll listener with improved state management
    $ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: useThrottleFn((self) => {
        const scrollTop = window.scrollY;
        const direction = self.direction;

        // Minimum distance to scroll before toggling header
        const minScrollThreshold = Math.min(100, headerHeight.value);

        // Only change header state when specific conditions are met
        // This prevents rapid toggling when scrolling direction changes quickly
        if (direction > 0 && scrollTop > minScrollThreshold) {
          // Only hide if currently visible (prevents animation conflicts)
          if (isHeaderVisible.value) {
            isHeaderVisible.value = false;
            // Kill any running animations first
            $gsap.killTweensOf(header);
            $gsap.to(header, { yPercent: -100, duration: 0.3, ease: 'power3.out' });
          }
        } else if (direction < 0) {
          // Only show if currently hidden (prevents animation conflicts)
          if (!isHeaderVisible.value) {
            isHeaderVisible.value = true;
            // Kill any running animations first
            $gsap.killTweensOf(header);
            $gsap.to(header, { yPercent: 0, duration: 0.3, ease: 'power3.out' });
          }
        }
      }, 400), // Throttle to 400ms between executions
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
    headerRef,
    headerHeight,
    initScrollHeader,
    cleanup,
    isHeaderVisible, // Expose the visibility state
  };
};
