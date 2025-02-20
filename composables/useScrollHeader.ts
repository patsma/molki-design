import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ref, onMounted, onUnmounted } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { useMobileDetection } from '~/composables/useMobileDetection';
import { useDebounceFn } from '@vueuse/core';

export const useScrollHeader = () => {
  const headerRef = ref<HTMLElement | null>(null);
  const { height: headerHeight } = useElementBounding(headerRef);
  const { isMobile } = useMobileDetection();

  let headerTrigger: ScrollTrigger | null = null;
  let headerAnimation: gsap.core.Timeline | null = null;
  let lastCheck = 0;

  const updateHeaderHeight = () => {
    if (!headerRef.value) return;

    // Get the current header height before any changes
    const currentHeight = headerRef.value.offsetHeight;

    // Clear any existing inline styles that might affect height
    gsap.set(headerRef.value, { clearProps: 'height' });

    // Get the natural height after clearing props
    const newHeight = headerRef.value.offsetHeight;

    // Only update if the height actually changed
    if (currentHeight !== newHeight) {
      gsap.set(headerRef.value, { height: newHeight });

      // Only refresh ScrollTrigger if we're not on mobile or if the height difference is significant
      if (!isMobile.value || Math.abs(currentHeight - newHeight) > 10) {
        headerTrigger?.refresh();
      }
    }
  };

  const handleResize = useDebounceFn(() => {
    // Only update if we're not on mobile or if the resize isn't from mobile UI (keyboard, address bar, etc.)
    if (
      !isMobile.value ||
      Math.abs(window.innerHeight - document.documentElement.clientHeight) > 100
    ) {
      updateHeaderHeight();
    }
  }, 250);

  const initScrollHeader = () => {
    if (!process.client || !headerRef.value) {
      console.log('⚠️ Header initialization skipped:', {
        isClient: process.client,
        hasHeaderRef: !!headerRef.value,
      });
      return;
    }

    // Add resize listener
    window.addEventListener('resize', handleResize);

    if (isMobile.value) {
      initMobileHeader();
      return;
    }

    // Initial height setup
    updateHeaderHeight();

    // Pin the header
    headerTrigger = ScrollTrigger.create({
      trigger: headerRef.value,
      start: 'top top',
      endTrigger: 'html',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      onRefresh: updateHeaderHeight,
    });

    // Create hide/show animation
    headerAnimation = gsap
      .timeline({ paused: true })
      .fromTo(
        headerRef.value,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.3, ease: 'power3.inOut' }
      );

    // Create scroll listener
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const now = Date.now();
        if (now - lastCheck < 400) return;
        lastCheck = now;

        const smoother = ScrollSmoother.get();
        if (!smoother) return;

        const scrollTop = smoother.scrollTop();
        const direction = self.direction;

        if (direction > 0 && scrollTop > headerHeight.value) {
          gsap.to(headerRef.value, { yPercent: -100, duration: 0.3 });
        } else if (direction < 0) {
          gsap.to(headerRef.value, { yPercent: 0, duration: 0.3 });
        }
      },
    });
  };

  const initMobileHeader = () => {
    const header = headerRef.value;
    if (!header) {
      console.warn('⚠️ Header element not found');
      return;
    }

    // Initial height setup
    updateHeaderHeight();

    // Same pin configuration
    headerTrigger = ScrollTrigger.create({
      trigger: header,
      start: 'top top',
      endTrigger: 'html',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      onRefresh: updateHeaderHeight,
    });

    // Same animation timeline
    headerAnimation = gsap
      .timeline({ paused: true })
      .fromTo(header, { yPercent: 0 }, { yPercent: -100, duration: 0.3, ease: 'power3.inOut' });

    // Modified scroll listener without ScrollSmoother
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const now = Date.now();
        if (now - lastCheck < 400) return;
        lastCheck = now;

        const scrollTop = window.scrollY;
        const direction = self.direction;

        if (direction > 0 && scrollTop > headerHeight.value) {
          headerAnimation?.play();
        } else if (direction < 0) {
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
    window.removeEventListener('resize', handleResize);
  };

  return {
    headerRef,
    headerHeight,
    initScrollHeader,
    cleanup,
  };
};
