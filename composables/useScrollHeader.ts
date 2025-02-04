import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ref } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { useMobileDetection } from '~/composables/useMobileDetection';

export const useScrollHeader = () => {
  const headerRef = ref<HTMLElement | null>(null);
  const { height: headerHeight } = useElementBounding(headerRef);
  const { isMobile } = useMobileDetection();

  let headerTrigger: ScrollTrigger | null = null;
  let headerAnimation: gsap.core.Timeline | null = null;
  let lastCheck = 0;

  const initScrollHeader = () => {
    console.log('🎯 Initializing scroll header');
    if (!process.client || !headerRef.value) {
      console.log('⚠️ Header initialization skipped:', {
        isClient: process.client,
        hasHeaderRef: !!headerRef.value,
      });
      return;
    }

    if (isMobile.value) {
      console.log('📱 Initializing mobile header');
      initMobileHeader();
      return;
    }

    console.log('🖥️ Initializing desktop header');
    // Ensure header has correct height before pinning
    gsap.set(headerRef.value, {
      height: headerHeight.value,
      clearProps: 'all', // Clear all other properties
    });

    // Pin the header
    headerTrigger = ScrollTrigger.create({
      trigger: headerRef.value,
      start: 'top top',
      endTrigger: 'html',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      onRefresh: () => {
        // Ensure header maintains correct height during refresh
        gsap.set(headerRef.value, { height: headerHeight.value });
      },
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
    console.log('📱 Setting up mobile header');
    const header = headerRef.value;
    if (!header) {
      console.warn('⚠️ Header element not found');
      return;
    }

    gsap.set(header, { clearProps: 'all' });

    const trigger = ScrollTrigger.create({
      trigger: header,
      start: 'top top',
      endTrigger: 'html',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      onRefresh: () => {
        console.log('🔄 Refreshing header height:', headerHeight.value);
        gsap.set(header, { height: headerHeight.value });
      },
      onEnter: () => console.log('Header trigger entered'),
      onLeave: () => console.log('Header trigger left'),
    });

    console.log('📌 Created ScrollTrigger for header:', trigger);
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
  };
};
